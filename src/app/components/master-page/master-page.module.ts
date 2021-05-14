import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from '../cart/cart.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from './master-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MasterPageComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
  ],
    imports: [
        CommonModule,
        MasterPageRoutingModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgbCarouselModule,
        SharedModule,
    ],
})
export class MasterPageModule {
}
