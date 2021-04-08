import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { CategoryComponent } from '../category/category.component';
import { LoginComponent } from '../login/login.component';
import { ProductComponent } from '../product/product.component';

import { AdminMasterPageRoutingModule } from './admin-master-page-routing.module';
import { AdminMasterPageComponent } from './admin-master-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


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
    ],
})
export class AdminMasterPageModule {
}
