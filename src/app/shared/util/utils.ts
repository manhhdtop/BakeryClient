import { TranslateService } from '@ngx-translate/core';

export class Utils {
  static getPageTitle(activeRoute): string {
    const pageTitle = 'page_title';
    if (activeRoute.firstChild.snapshot.data[pageTitle]) {
      return activeRoute.firstChild.snapshot.data[pageTitle];
    }
    return 'menu.home.title';
  }
}
