import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPageComponent } from './master-page.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MasterPageRoutingModule } from './master-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    MasterPageComponent,
    FooterComponent,
  ],
    imports: [
        CommonModule,
        MasterPageRoutingModule,
        RouterModule,
        TranslateModule,
        FormsModule,
    ],
})
export class MasterPageModule {
}
