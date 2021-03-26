import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { I18nModule } from '../i18n/i18n.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    HttpClientModule,
    I18nModule,
    NgbModule,
  ],
  exports: [
    HttpClientModule,
    I18nModule,
  ],
  declarations: [],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    // {
    //   provide: DEFAULT_TIMEOUT,
    //   useValue: 10000
    // }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
}
