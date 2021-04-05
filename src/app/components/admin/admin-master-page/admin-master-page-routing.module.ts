import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterPageComponent } from './admin-master-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMasterPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          page_title: 'menu.admin.home.title',
        },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          page_title: 'menu.admin.category.title',
        },
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          page_title: 'menu.admin.product.title',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMasterPageRoutingModule {
}
