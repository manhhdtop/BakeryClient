import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'vn']);
    const defaultLang = 'vn';
    let lang = localStorage.getItem('language');
    if (!lang || lang.trim() === '') {
      lang = defaultLang;
    }
    translate.setDefaultLang(defaultLang);
    translate.use(lang);
  }
}

export function translateLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
