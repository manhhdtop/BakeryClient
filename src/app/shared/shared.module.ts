import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '../i18n/i18n.module';
import { DateFormatPipe } from './pipe/format-date.pipe';
import { DEFAULT_TIMEOUT, ErrorInterceptor } from './interceptor/error.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    I18nModule,
    NgbModule,
  ],
  exports: [
    DateFormatPipe,
    HttpClientModule,
    I18nModule,
  ],
  declarations: [
    DateFormatPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: DEFAULT_TIMEOUT,
      useValue: 10000,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
}
