import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterPageComponent } from './admin-master-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
import { AuthGuard } from '../../../shared/guards/guards.class';
import { LoginComponent } from '../login/login.component';

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
        canActivate: [AuthGuard],
      },
      {
        path: 'danh-muc',
        component: CategoryComponent,
        data: {
          page_title: 'menu.admin.category.title',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          page_title: 'menu.admin.category.title',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'san-pham',
        component: ProductComponent,
        data: {
          page_title: 'menu.admin.product.title',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          page_title: 'menu.admin.product.title',
        },
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      page_title: 'menu.admin.login.title',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMasterPageRoutingModule {
}
