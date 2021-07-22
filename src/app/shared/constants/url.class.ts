export class UrlConstant {
  // Auth
  public static readonly LOGIN = '/auth/login';
  public static readonly LOGOUT = '/auth/logout';
  public static readonly CHECK_TOKEN = '/auth/check-token';
  public static readonly REFRESH_TOKEN = '/auth/refresh-token';
  public static readonly UNAUTHORIZED = '/unauthorized';
  public static readonly PAGE_NOT_FOUND = '/page-not-found';
  public static readonly INTERNAL_SERVER_ERROR = '/internal-server-error';
  public static readonly ADMIN = '/admin';
  // Upload
  public static readonly UPLOAD = '/upload';
  public static readonly UPLOADS = '/uploads';
  public static readonly UPLOAD_IMAGE = '/upload-image';
  public static readonly UPLOAD_IMAGES = '/upload-images';
  // Category
  public static readonly CATEGORY = '/category';
  public static readonly ADMIN_CATEGORY = UrlConstant.ADMIN + UrlConstant.CATEGORY;
  public static readonly PARENT_CATEGORIES = UrlConstant.ADMIN_CATEGORY + '/parents';
  public static readonly ACTIVE_CATEGORIES = UrlConstant.ADMIN_CATEGORY + '/active';
  public static readonly CREATE_CATEGORY_SLUG = UrlConstant.ADMIN_CATEGORY + '/create-slug';
  // Action
  public static readonly ACTION = UrlConstant.ADMIN + '/action';
  public static readonly ACTIVE_ACTIONS = UrlConstant.ACTION + '/actives';
  // Role
  public static readonly ROLE = UrlConstant.ADMIN + '/role';
  public static readonly ACTIVE_ROLES = UrlConstant.ROLE + '/actives';
  // User
  public static readonly USER = UrlConstant.ADMIN + '/user';
  // Product
  public static readonly PRODUCT = '/product';
  public static readonly ADMIN_PRODUCT = UrlConstant.ADMIN + UrlConstant.PRODUCT;
  public static readonly CREATE_PRODUCT_SLUG = UrlConstant.ADMIN_PRODUCT + '/create-slug';
  // Option
  public static readonly OPTION_TYPE = UrlConstant.ADMIN + '/option-type';
  // Voucher
  public static readonly VOUCHER = '/voucher';
  public static readonly ADMIN_VOUCHER = UrlConstant.ADMIN + UrlConstant.VOUCHER;
  public static readonly ACTIVE_VOUCHERS = UrlConstant.ADMIN_VOUCHER + '/actives';
  public static readonly GET_VOUCHER_BY_CODE = UrlConstant.ADMIN_VOUCHER + '/find-by-code';
  public static readonly UPDATE_STATUS_VOUCHER = UrlConstant.ADMIN_VOUCHER + '/update-status';
  public static readonly GENERATE_CODE = UrlConstant.VOUCHER + '/generate-code';
  public static readonly CHECK_CODE = UrlConstant.VOUCHER + '/check-code';
  // Catalog
  public static readonly CATALOG = '/catalog';
  public static readonly PROVINCES = UrlConstant.CATALOG + '/provinces';
  public static readonly DISTRICTS = UrlConstant.CATALOG + '/districts';
  // Invoice
  public static readonly INVOICE = '/invoice';
  public static readonly ADMIN_INVOICE = UrlConstant.ADMIN + UrlConstant.INVOICE;
  public static readonly CREATE_INVOICE = UrlConstant.INVOICE + '/create-invoice';
  public static readonly INVOICE_UPDATE_STATUS = UrlConstant.ADMIN_INVOICE + '/update-status';
  // Mail
  public static readonly MAIL_TEMPLATE = UrlConstant.ADMIN + '/mail-template';
  // Dashboard
  public static readonly DASHBOARD = UrlConstant.ADMIN + '/dashboard';
  public static readonly DASHBOARD_OVERVIEW = UrlConstant.DASHBOARD + '/dashboard-overview';
  // Contact
  public static readonly CONTACT = '/contact';
  public static readonly ADMIN_CONTACT = UrlConstant.ADMIN + UrlConstant.CONTACT;
  public static readonly NEW_CONTACT = UrlConstant.CONTACT + '/news-contact';
  public static readonly CONTACT_UPDATE_STATUS = UrlConstant.ADMIN_CONTACT + '/update-status';
  // Action
  public static readonly NEWS = '/news';
  public static readonly ADMIN_NEWS = UrlConstant.ADMIN + UrlConstant.NEWS;
  public static readonly ACTIVE_NEWS = UrlConstant.ADMIN_NEWS + '/actives';
  public static readonly CREATE_NEWS_SLUG = UrlConstant.ADMIN_NEWS + '/create-slug';
  public static readonly HOME_NEWS = UrlConstant.NEWS + '/home-news';
  // Search
  public static readonly SEARCH = '/search';
}
