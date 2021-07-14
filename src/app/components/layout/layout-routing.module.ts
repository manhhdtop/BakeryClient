import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/app/components/layout/cart/cart.component';
import { CategoryComponent } from 'src/app/components/layout/category/category.component';
import { HomeComponent } from 'src/app/components/layout/home/home.component';
import { MasterPageComponent } from 'src/app/components/master-page/master-page.component';
import { ProductComponent } from 'src/app/components/layout/product/product.component';
import { ProductListComponent } from 'src/app/components/layout/product-list/product-list.component';
import { CheckoutComponent } from 'src/app/components/layout/checkout/checkout.component';
import { ContactComponent } from 'src/app/components/layout/contact/contact.component';
import { NewsComponent } from 'src/app/components/layout/news/news.component';

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          page_title: 'menu.home.title',
        },
      },
      {
        path: '',
        component: HomeComponent,
        data: {
          page_title: 'menu.home.title',
        },
      },
      {
        path: 'cart',
        component: CartComponent,
        data: {
          page_title: 'menu.cart.title',
        },
      },
      {
        path: 'gio-hang',
        component: CartComponent,
        data: {
          page_title: 'menu.cart.title',
        },
      },
      {
        path: 'danh-muc',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
        },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
        },
      },
      {
        path: 'danh-muc/:slug',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
        },
      },
      {
        path: 'category/:slug',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
        },
      },
      {
        path: 'san-pham',
        component: ProductListComponent,
        data: {
          page_title: 'menu.product.title',
        },
      },
      {
        path: 'product',
        component: ProductListComponent,
        data: {
          page_title: 'menu.product.title',
        },
      },
      {
        path: 'san-pham/:slug',
        component: ProductComponent,
        data: {
          page_title: 'menu.product.title',
        },
      },
      {
        path: 'product/:slug',
        component: ProductComponent,
        data: {
          page_title: 'menu.product.title',
        },
      },
      {
        path: 'thanh-toan',
        component: CheckoutComponent,
        data: {
          page_title: 'menu.checkout.title',
        },
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          page_title: 'menu.checkout.title',
        },
      },
      {
        path: 'lien-he',
        component: ContactComponent,
        data: {
          page_title: 'menu.contact.title',
        },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          page_title: 'menu.contact.title',
        },
      },
      {
        path: 'tin-tuc',
        component: NewsComponent,
        data: {
          page_title: 'menu.news.title',
        },
      },
      {
        path: 'news',
        component: NewsComponent,
        data: {
          page_title: 'menu.news.title',
        },
      },
      {
        path: 'tin-tuc/:slug',
        component: NewsComponent,
        data: {
          page_title: 'menu.news.title',
        },
      },
      {
        path: 'news/:slug',
        component: NewsComponent,
        data: {
          page_title: 'menu.news.title',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class LayoutRoutingModule {
}
