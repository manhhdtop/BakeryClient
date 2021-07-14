import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.class';
import { ActionComponent } from 'src/app/components/admin/action/action.component';
import { CategoryComponent } from 'src/app/components/admin/category/category.component';
import { OptionTypeComponent } from 'src/app/components/admin/option_type/option-type.component';
import { ProductComponent } from 'src/app/components/admin/product/product.component';
import { RoleComponent } from 'src/app/components/admin/role/role.component';
import { UserComponent } from 'src/app/components/admin/user/user.component';
import { AdminMasterPageComponent } from 'src/app/components/admin/admin-master-page/admin-master-page.component';
import { DashboardComponent } from 'src/app/components/admin/admin-master-page/dashboard/dashboard.component';
import { VoucherComponent } from 'src/app/components/admin/voucher/voucher.component';
import { InvoiceComponent } from 'src/app/components/admin/invoice/invoice.component';
import { MailTemplateComponent } from 'src/app/components/admin/mail-template/mail-template.component';
import { ContactComponent } from 'src/app/components/admin/contact/contact.component';

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
      {
        path: 'voucher',
        component: VoucherComponent,
        data: {
          page_title: 'menu.admin.voucher.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
          page_title: 'menu.admin.invoice.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'mail-template',
        component: MailTemplateComponent,
        data: {
          page_title: 'menu.admin.mail_template.title',
        },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          page_title: 'menu.admin.contact.title',
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
