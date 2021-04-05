import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMasterPageRoutingModule } from './admin-master-page-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [HeaderComponent, FooterComponent, SidebarComponent, DashboardComponent],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AdminMasterPageRoutingModule,
    TranslateModule,
  ],
})
export class AdminMasterPageModule { }
