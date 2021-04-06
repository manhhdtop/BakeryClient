import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminMasterPageModule } from './components/admin/admin-master-page/admin-master-page.module';
import { CartComponent } from './components/cart/cart.component';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MasterPageModule } from './components/master-page/master-page.module';
import { ToastComponent } from './shared/component/toast/toast.component';
import { AuthGuard } from './shared/guards/auth-guard.class';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AppComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
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
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
