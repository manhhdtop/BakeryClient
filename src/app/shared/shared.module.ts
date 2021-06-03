import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nModule } from '../i18n/i18n.module';
import { CkeditorComponent } from './component/ckeditor/ckeditor.component';
import { NumberFormatInputDirective } from './component/number-format-input.directive';
import { DEFAULT_TIMEOUT, ErrorInterceptor } from './interceptor/error.interceptor';
import { DateFormatPipe } from './pipe/format-date.pipe';
import { NumberFormatPipe } from './pipe/format-number.pipe';
import { AddToCardComponent } from './component/add-to-card/add-to-card.component';
import { NumberInputDirective } from 'src/app/shared/component/number-input.directive';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { AccessDeniedComponent } from 'src/app/components/error/access-denied/access-denied.component';
import { InternalServerErrorComponent } from 'src/app/components/error/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from 'src/app/components/error/page-not-found/page-not-found.component';
import { ToastComponent } from 'src/app/shared/component/toast/toast.component';
import { SliderComponent } from './component/slider/slider.component';

@NgModule({
  imports: [
    HttpClientModule,
    I18nModule,
    NgbModule,
    CKEditorModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    DateFormatPipe,
    HttpClientModule,
    I18nModule,
    CkeditorComponent,
    NumberFormatInputDirective,
    NumberInputDirective,
    NumberFormatPipe,
    AddToCardComponent,
    ConfirmComponent,
    AccessDeniedComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
    ToastComponent,
    SliderComponent,
  ],
  declarations: [
    DateFormatPipe,
    CkeditorComponent,
    NumberFormatInputDirective,
    NumberInputDirective,
    NumberFormatPipe,
    AddToCardComponent,
    ConfirmComponent,
    AccessDeniedComponent,
    InternalServerErrorComponent,
    PageNotFoundComponent,
    ToastComponent,
    SliderComponent,
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
