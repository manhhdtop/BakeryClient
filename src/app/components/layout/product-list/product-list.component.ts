import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppConfigService } from 'src/app/service/app-config.service';
import { CartService } from 'src/app/service/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/shared/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { MenuCategory } from 'src/app/shared/model/menu-category';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { formatNumber } from '@angular/common';

interface Param {
  name?: string;
  categoryIds?: number[];
  fromPrice?: string;
  toPrice?: string;
  page: number;
  size: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../../assets/css/items.scss'],
})
export class ProductListComponent implements OnInit {
  baseUrl: string;
  currentProduct: Product;
  products: Product[];
  categories: MenuCategory[];
  sliderOptions: Options;
  params: Param;
  page: number;
  size: number;
  minPrice: number;
  maxPrice: number;
  keyword: string;
  categoryIds: number[];
  private searchEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('addToCardModal') addToCardModal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private configService: AppConfigService,
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.categoryIds = [];
    this.searchEvent.subscribe(() => {
      this.search();
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params.keyword ? params.keyword : '';
      this.searchEvent.emit();
    });
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
    this.getCategories();
  }

  private getProducts(): void {
    this.productService.getProducts(this.params).subscribe(res => {
      if (res.errorCode && res.errorCode === '200') {
        const isInit = this.products === undefined;
        this.products = [...res.data.content];
        const arrPrice = this.products.map(({price}) => price);
        let min: number;
        let max: number;
        if (arrPrice && arrPrice.length > 0) {
          min = Math.min.apply(null, arrPrice);
          max = Math.max.apply(null, arrPrice);
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

  updateSliderOptions(min, max): void {
    const newOptions: Options = Object.assign({}, this.sliderOptions);
    newOptions.floor = min;
    newOptions.ceil = max;
    this.sliderOptions = newOptions;
  }

  search(): void {
    if (!this.params) {
      this.params = {
        page: this.configService.getConfig().page,
        size: this.configService.getConfig().defaultPageSize,
      };
    }
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
}
