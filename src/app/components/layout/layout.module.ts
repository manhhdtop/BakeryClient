import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from 'src/app/components/layout/cart/cart.component';
import { HomeComponent } from 'src/app/components/layout/home/home.component';
import { FooterComponent } from 'src/app/components/master-page/footer/footer.component';
import { HeaderComponent } from 'src/app/components/master-page/header/header.component';
import { LayoutRoutingModule } from 'src/app/components/layout/layout-routing.module';
import { MasterPageComponent } from 'src/app/components/master-page/master-page.component';
import { CategoryComponent } from 'src/app/components/layout/category/category.component';
import { ProductComponent } from 'src/app/components/layout/product/product.component';
import { ProductListComponent } from 'src/app/components/layout/product-list/product-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MasterPageComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    CategoryComponent,
    ProductComponent,
    ProductListComponent,
    CheckoutComponent,
    ContactComponent,
    NewsComponent,
    NewsListComponent,
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        NgbCarouselModule,
        SharedModule,
        NgbTooltipModule,
        NgxSliderModule,
        ReactiveFormsModule,
    ],
})
export class LayoutModule {
}
