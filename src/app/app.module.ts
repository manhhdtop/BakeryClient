import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/internal-server-error/internal-server-error.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MasterPageModule } from './components/master-page/master-page.module';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/master-page/header/header.component';
import { AdminMasterPageComponent } from './components/admin/admin-master-page/admin-master-page.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AuthComponent,
    AppComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
    AdminMasterPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MasterPageModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
