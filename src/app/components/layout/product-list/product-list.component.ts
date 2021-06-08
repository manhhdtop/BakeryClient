import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss', '../../../../assets/css/items.scss'],
})
export class ProductListComponent implements OnInit {
  baseUrl: string;
  params: any;
  products: Product[];
  categories: MenuCategory[];
  page: number;
  size: number;
  minPrice: number;
  maxPrice: number;
  sliderOptions: Options;

  constructor(
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
    this.getProducts();
    this.getCategories();
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
        this.products = [...res.data.content];
        const arrPrice = this.products.map(({price}) => price);
        this.minPrice = Math.min.apply(null, arrPrice);
        this.maxPrice = Math.max.apply(null, arrPrice);
        this.updateSliderOptions(this.minPrice, this.maxPrice);
        this.page = res.data.pageable.pageNumber + 1;
        this.size = res.data.pageable.pageSize;
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getCategories(): void {
    this.categoryService.menuCategoryEvent.subscribe(e => {
      this.categories = [...e];
    });
    this.categoryService.getMenuCategories();
  }

  showAddToCartModal(p: Product): void {

  }

  updateSliderOptions(min, max): void {
    const newOptions: Options = Object.assign({}, this.sliderOptions);
    newOptions.floor = min;
    newOptions.ceil = max;
    this.sliderOptions = newOptions;
  }

  valueChange(value): void {
    console.log('min: ', value);
  }

  highValueChange(value): void {
    console.log('max: ', value);
  }
}
