export class Utils {
  static getPageTitle(activeRoute): string {
    const pageTitle = 'page_title';
    if (activeRoute.hasChildren) {
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
}
