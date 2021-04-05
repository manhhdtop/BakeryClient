import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/internal-server-error/internal-server-error.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MasterPageModule } from './components/master-page/master-page.module';
import { AuthComponent } from './components/admin/auth/auth.component';
import { HeaderComponent } from './components/master-page/header/header.component';
import { AdminMasterPageComponent } from './components/admin/admin-master-page/admin-master-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { AdminMasterPageModule } from './components/admin/admin-master-page/admin-master-page.module';
import { CategoryComponent } from './components/admin/category/category.component';
import { ProductComponent } from './components/admin/product/product.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AuthGuard } from './shared/guards/guards.class';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/component/toast/toast.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AuthComponent,
    AppComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
    AdminMasterPageComponent,
    HomeComponent,
    CartComponent,
    CategoryComponent,
    ProductComponent,
    LoginComponent,
    ToastComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MasterPageModule,
    SharedModule,
    NgbCarouselModule,
    NgbModule,
    AdminMasterPageModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
