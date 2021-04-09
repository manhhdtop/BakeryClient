import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminMasterPageModule } from './components/admin/admin-master-page/admin-master-page.module';
import { AccessDeniedComponent } from './components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from './components/error/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';
import { MasterPageModule } from './components/master-page/master-page.module';
import { AppConfigService } from './service/app-config.service';
import { AuthService } from './service/auth.service';
import { BaseService } from './shared/base-service/base-service.service';
import { ToastComponent } from './shared/component/toast/toast.component';
import { AuthGuard } from './shared/guards/auth-guard.class';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './components/admin/user/user.component';
import { RoleComponent } from './components/admin/role/role.component';
import { ActionComponent } from './components/admin/action/action.component';

export function configServiceFactory(config: AppConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AppComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
    ToastComponent,
    UserComponent,
    RoleComponent,
    ActionComponent,
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
    AppConfigService,
    AuthGuard,
    AuthService,
    BaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
