export class Constant {
  public static readonly DATE_FMT = 'dd/MM/yyyy';
  public static readonly DATE_DDMMYY_HHMMSS = 'dd/MM/yyyy HH:mm:ss';
  public static readonly TOKEN = 'token';
  public static readonly USER_INFO = 'user_info';
  static HEADER_APPLICATION = 'Authorization';
  static NAME_PATTERN = '\\s*[a-zA-ZẠ-ỵ\u00c0-\u00fd0-9][a-zA-ZẠ-ỵ\u00c0-\u00fd- ]+[a-zA-ZẠ-ỵ\u00c0-\u00fd]\\s*';
}

export const Status = [
  {value: 0, name: 'status.deactive'},
  {value: 1, name: 'status.active'},
  {value: -1, name: 'status.locked'},
];

export const VoucherType = [
  {value: 1, name: 'voucher_type.amount', icon: 'vnd'},
  {value: 2, name: 'voucher_type.percent', icon: '%'},
];

export enum EditorType {
  CLASSIC,
  DOCUMENT
}
