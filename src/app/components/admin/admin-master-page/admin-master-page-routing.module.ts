import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/guards/auth-guard.class';
import { ActionComponent } from '../action/action.component';
import { CategoryComponent } from '../category/category.component';
import { OptionTypeComponent } from '../option_type/option-type.component';
import { ProductComponent } from '../product/product.component';
import { RoleComponent } from '../role/role.component';
import { UserComponent } from '../user/user.component';
import { AdminMasterPageComponent } from './admin-master-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMasterPageComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
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
      {
        path: 'tai-khoan',
        component: UserComponent,
        data: {
          page_title: 'menu.admin.user.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          page_title: 'menu.admin.user.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'action',
        component: ActionComponent,
        data: {
          page_title: 'menu.admin.action.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'phan-quyen',
        component: RoleComponent,
        data: {
          page_title: 'menu.admin.role.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'role',
        component: RoleComponent,
        data: {
          page_title: 'menu.admin.role.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'option-type',
        component: OptionTypeComponent,
        data: {
          page_title: 'menu.admin.option_type.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
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
