import { TranslateService } from '@ngx-translate/core';

export class Utils {
  static getPageTitle(activeRoute): string {
    const pageTitle = 'page_title';
    let child = activeRoute.firstChild;
    while (child.firstChild) {
      child = child.firstChild;
    }
    if (child.snapshot.data[pageTitle]) {
      return child.snapshot.data[pageTitle];
    }
    return '';
  }
}
