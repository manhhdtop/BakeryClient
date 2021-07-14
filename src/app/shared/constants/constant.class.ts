export class Constant {
  public static readonly DATE_FMT = 'dd/MM/yyyy';
  public static readonly DATE_DDMMYY_HHMMSS = 'dd/MM/yyyy HH:mm:ss';
  public static readonly TOKEN = 'token';
  public static readonly USER_INFO = 'user_info';
  static HEADER_APPLICATION = 'Authorization';
  static NAME_PATTERN = '\\s*[a-zA-ZẠ-ỵ\u00c0-\u00fd0-9][a-zA-ZẠ-ỵ\u00c0-\u00fd- ]+[a-zA-ZẠ-ỵ\u00c0-\u00fd]\\s*';
  static EMAIL_PATTERN = '^[a-z][a-z0-9_\\.]{2,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$';
  static TEMPLATE_CODE_PATTERN = '^[A-Z][A-Z0-9_]{3,}[A-Z]$';
}

export const Status = [
  {value: 0, name: 'status.deactive'},
  {value: 1, name: 'status.active'},
  {value: -1, name: 'status.locked'},
];

export const InvoiceStatus = [
  {value: 0, name: 'invoice_status.init'},
  {value: 1, name: 'invoice_status.confirmed'},
  {value: 2, name: 'invoice_status.shipping'},
  {value: 3, name: 'invoice_status.success'},
  {value: -1, name: 'invoice_status.reject'},
  {value: -2, name: 'invoice_status.shipping_error'},
  {value: -3, name: 'invoice_status.error'},
];

export const ContactStatus = [
  {value: 0, name: 'contact_status.init'},
  {value: 1, name: 'contact_status.success'},
  {value: 2, name: 'contact_status.reject'},
];

export const VoucherType = [
  {value: 1, name: 'voucher_type.amount', icon: 'vnd'},
  {value: 2, name: 'voucher_type.percent', icon: '%'},
];

export enum EditorType {
  CLASSIC,
  DOCUMENT
}
