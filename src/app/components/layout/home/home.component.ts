import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from 'src/app/service/app-config.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { MenuCategory } from 'src/app/shared/model/menu-category';
import { Product } from 'src/app/shared/model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../../assets/css/items.scss'],
})
export class HomeComponent implements OnInit {
  categories: MenuCategory[];
  products: Product[];
  currentProduct: Product;
  page: number;
  size: number;
  baseUrl: string;

  @ViewChild('addToCardModal') addToCardModal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appConfigService: AppConfigService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toast: ToastService,
  ) {
    this.baseUrl = this.appConfigService.getConfig().api.baseUrl;
  }

  ngOnInit(): void {
    this.getMenuCategory();
    this.getProduct();
    this.page = this.activatedRoute.snapshot.queryParams.page || this.appConfigService.getConfig().page;
    this.size = this.activatedRoute.snapshot.queryParams.size || this.appConfigService.getConfig().defaultPageSize;
  }

  private getMenuCategory(): void {
    this.categoryService.menuCategoryEvent.subscribe(e => {
      this.categories = e;
    });
    this.categoryService.getMenuCategories();
  }

  private getProduct(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = [...res.data.content];
    });
  }

  showAddToCartModal(product): void {
    this.currentProduct = product;
    this.addToCardModal.open();
  }
}
