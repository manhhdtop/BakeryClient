import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/guards/auth-guard.class';
import { CategoryComponent } from '../category/category.component';
import { LoginComponent } from '../login/login.component';
import { ProductComponent } from '../product/product.component';
import { AdminMasterPageComponent } from './admin-master-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMasterPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
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
