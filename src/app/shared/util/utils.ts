import { Status } from '../constants/constant.class';

export class Utils {
  static statuses = Status;

  static getPageTitle(activeRoute): string {
    const pageTitle = 'page_title';
    if (activeRoute.firstChild) {
      if (activeRoute.firstChild.snapshot.data[pageTitle]) {
        return activeRoute.firstChild.snapshot.data[pageTitle];
      }
    } else {
      if (activeRoute.data.value.page_title) {
        return activeRoute.data.value.page_title;
      }
    }
    return 'menu.home.title';
  }

  static getStatusName(status): string {
    return this.statuses.filter(e => e.value === status)[0]?.name || 'status.locked_by_admin';
  }
}
