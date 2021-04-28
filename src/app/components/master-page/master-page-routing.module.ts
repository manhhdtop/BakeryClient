import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CategoryComponent } from '../category/category.component';
import { HomeComponent } from '../home/home.component';
import { MasterPageComponent } from './master-page.component';

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
        path: 'danh-muc/:slug/:child',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
        },
      },
      {
        path: 'category/:slug/:child',
        component: CategoryComponent,
        data: {
          page_title: 'menu.category.title',
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
export class MasterPageRoutingModule {
}
