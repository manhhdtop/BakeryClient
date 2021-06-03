import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminMasterPageModule } from 'src/app/components/admin/admin-master-page.module';
import { LayoutModule } from 'src/app/components/layout/layout.module';
import { AppConfigService } from './service/app-config.service';
import { AuthService } from './service/auth.service';
import { BaseService } from './shared/base-service/base-service.service';
import { AuthGuard } from './shared/guards/auth-guard.class';
import { SharedModule } from './shared/shared.module';

export function configServiceFactory(config: AppConfigService): any {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
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
  exports: [],
})
export class AppModule {
}
