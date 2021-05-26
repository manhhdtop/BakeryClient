import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '../i18n/i18n.module';
import { CkeditorComponent } from './component/ckeditor/ckeditor.component';
import { NumberFormatInputDirective } from './component/number-format-input.directive';
import { DEFAULT_TIMEOUT, ErrorInterceptor } from './interceptor/error.interceptor';
import { DateFormatPipe } from './pipe/format-date.pipe';
import { NumberFormatPipe } from './pipe/format-number.pipe';
import { AddToCardComponent } from './component/add-to-card/add-to-card.component';

@NgModule({
  imports: [
    HttpClientModule,
    I18nModule,
    NgbModule,
    CKEditorModule,
    FormsModule,
  ],
    exports: [
        DateFormatPipe,
        HttpClientModule,
        I18nModule,
        CkeditorComponent,
        NumberFormatInputDirective,
        NumberFormatPipe,
        AddToCardComponent,
    ],
  declarations: [
    DateFormatPipe,
    CkeditorComponent,
    NumberFormatInputDirective,
    NumberFormatPipe,
    AddToCardComponent,
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
