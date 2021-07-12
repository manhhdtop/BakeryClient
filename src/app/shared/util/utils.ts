import { ContactStatus, InvoiceStatus, Status } from 'src/app/shared/constants/constant.class';

export class Utils {
  static statuses = Status;
  static invoiceStatus = InvoiceStatus;
  static contactStatus = ContactStatus;

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
    return this.statuses.filter(e => e.value === status)[0]?.name || '';
  }

  static getInvoiceStatusName(status): string {
    return this.invoiceStatus.filter(e => e.value === status)[0]?.name || '';
  }

  static getContactStatusName(status): string {
    return this.contactStatus.filter(e => e.value === status)[0]?.name || '';
  }
}
