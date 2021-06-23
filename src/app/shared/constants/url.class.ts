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
}
