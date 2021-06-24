import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
    NgbCarouselModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryComponent } from 'src/app/components/admin/category/category.component';
import { LoginComponent } from 'src/app/components/admin/login/login.component';
import { OptionTypeComponent } from 'src/app/components/admin/option_type/option-type.component';
import { ProductComponent } from 'src/app/components/admin/product/product.component';

import { AdminMasterPageRoutingModule } from 'src/app/components/admin/admin-master-page-routing.module';
import { AdminMasterPageComponent } from 'src/app/components/admin/admin-master-page/admin-master-page.component';
import { DashboardComponent } from 'src/app/components/admin/admin-master-page/dashboard/dashboard.component';
import { FooterComponent } from 'src/app/components/admin/admin-master-page/footer/footer.component';
import { HeaderComponent } from 'src/app/components/admin/admin-master-page/header/header.component';
import { SidebarComponent } from 'src/app/components/admin/admin-master-page/sidebar/sidebar.component';
import { UserComponent } from 'src/app/components/admin/user/user.component';
import { RoleComponent } from 'src/app/components/admin/role/role.component';
import { ActionComponent } from 'src/app/components/admin/action/action.component';
import { VoucherComponent } from './voucher/voucher.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceUpdateStatusComponent } from 'src/app/components/admin/invoice/update-status/invoice-update-status.component';


@NgModule({
  declarations: [
    AdminMasterPageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    LoginComponent,
    OptionTypeComponent,
    UserComponent,
    RoleComponent,
    ActionComponent,
    VoucherComponent,
    InvoiceComponent,
    InvoiceUpdateStatusComponent,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
    imports: [
        CommonModule,
        AdminMasterPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,
        NgbPaginationModule,
        FormsModule,
        NgbCarouselModule,
        CKEditorModule,
        NgbDropdownModule,
        NgbTooltipModule,
    ],
})
export class AdminMasterPageModule {
}
