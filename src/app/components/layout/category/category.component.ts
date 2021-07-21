import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';
import { AppConfigService } from 'src/app/service/app-config.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { formatNumber } from '@angular/common';
import { MenuCategory } from 'src/app/shared/model/menu-category';
import { Title } from '@angular/platform-browser';

interface Param {
  name?: string;
  categoryIds?: number[];
  fromPrice?: string;
  toPrice?: string;
  page: number;
  size: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss', '../../../../assets/css/items.scss'],
})
export class CategoryComponent implements OnInit {
  category: Category;
  products: Product[];
  categories: MenuCategory[];
  slug: string;
  baseUrl: string;
  categoryIds: number[];
  currentProduct: Product;
  sliderOptions: Options;
  params: Param;
  page: number;
  size: number;
  minPrice: number;
  maxPrice: number;
  keyword: string;

  @ViewChild('addToCardModal') addToCardModal;

  constructor(
    private categoryService: CategoryService,
    private configService: AppConfigService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getSlug();
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.minPrice = this.maxPrice = 0;
    this.sliderOptions = {
      floor: 0,
      ceil: 0,
      hidePointerLabels: true,
      hideLimitLabels: true,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
          case LabelType.High:
            return formatNumber(value, 'en-us');
          default:
            return '';
        }
      },
    };
  }

  private getSlug(): void {
    let slug = this.router.url;
    const arr = slug.trim().split('/');
    if (arr && arr.length > 2) {
      slug = '/' + arr[arr.length - 1].toLowerCase();
      this.categoryService.getCategoryBySlug(slug).subscribe(res => {
        this.category = res.data;
        this.categoryIds = [this.category.id];
        this.titleService.setTitle(this.category.name);
      });
    } else {
      this.category = undefined;
      this.categoryIds = [];
      this.getCategories();
    }
    this.getProducts();
  }

  private getProducts(): void {
    if (!this.params) {
      this.params = {
        page: this.configService.getConfig().page,
        size: this.configService.getConfig().defaultPageSize,
      };
    }
    this.productService.getProducts(this.params).subscribe(res => {
      if (res.errorCode && res.errorCode === '200') {
        const isInit = this.products === undefined;
        this.products = [...res.data.content];
        this.calculateRangePrice(isInit);
        this.page = res.data.pageable.pageNumber + 1;
        this.size = res.data.pageable.pageSize;
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  private getCategories(): void {
    this.categoryService.menuCategoryEvent.subscribe(e => {
      this.categories = [...e];
    });
    this.categoryService.getMenuCategories();
  }

  private calculateRangePrice(isInit): void {
    const arrPrice = this.products.map(({price}) => price);
    let min: number;
    let max: number;
    if (arrPrice && arrPrice.length > 0) {
      min = Math.min.apply(null, arrPrice);
      max = Math.max.apply(null, arrPrice);
      const minLength = min.toString().length - 1;
      const maxLength = max.toString().length - 1;
      min = Math.floor(min / Math.pow(10, minLength)) * Math.pow(10, minLength);
      max = Math.ceil(max / Math.pow(10, maxLength)) * Math.pow(10, maxLength);
    } else {
      min = 0;
      max = 0;
    }
    if (min === max) {
      this.minPrice = null;
      this.maxPrice = null;
    } else {
      if (isInit) {
        this.minPrice = min ? min : null;
        this.maxPrice = max ? max : null;
      } else {
        if (this.minPrice == null) {
          this.minPrice = min ? min : null;
        } else {
          if (this.minPrice < min) {
            this.minPrice = min ? min : null;
          }
        }
        if (this.maxPrice == null) {
          this.maxPrice = max ? max : null;
        } else {
          if (this.maxPrice > max) {
            this.maxPrice = max ? max : null;
          }
        }
      }
    }
    this.updateSliderOptions(min, max);
  }

  updateSliderOptions(min, max): void {
    const newOptions: Options = Object.assign({}, this.sliderOptions);
    newOptions.floor = min;
    newOptions.ceil = max;
    this.sliderOptions = newOptions;
  }

  search(): void {
    this.params.name = this.keyword ? this.keyword.trim() : '';
    this.params.fromPrice = this.minPrice ? this.minPrice + '' : '';
    this.params.toPrice = this.maxPrice ? this.maxPrice + '' : '';
    this.params.categoryIds = this.categoryIds;
    this.getProducts();
  }

  chooseCategory(id, checked): void {
    if (checked) {
      this.categoryIds.push(id);
    } else {
      const index = this.categoryIds.findIndex(e => e === id);
      if (index !== undefined && index != null) {
        this.categoryIds.splice(index, 1);
      }
    }
  }

  showAddToCartModal(product): void {
    this.currentProduct = product;
    this.addToCardModal.open();
  }

  clearFilter(): void {
    this.keyword = '';
    this.calculateRangePrice(false);
    this.categoryIds = this.category ? [this.category.id] : [];
    this.search();
  }
}
