import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DEFAULT_TIMEOUT, ErrorInterceptor } from './interceptor/error.interceptor';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  imports: [
    HttpClientModule,
    I18nModule,
  ],
  exports: [
    HttpClientModule,
    I18nModule,
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }, {
      provide: DEFAULT_TIMEOUT,
      useValue: 10000
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
