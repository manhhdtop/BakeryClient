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
  public static readonly CATEGORY = UrlConstant.ADMIN + '/category';
  public static readonly PARENT_CATEGORIES = UrlConstant.CATEGORY + '/parents';
  public static readonly ACTIVE_CATEGORIES = UrlConstant.CATEGORY + '/active';
  // Action
  public static readonly ACTION = UrlConstant.ADMIN + '/action';
  public static readonly ACTIVE_ACTIONS = UrlConstant.ACTION + '/actives';
  // Role
  public static readonly ROLE = UrlConstant.ADMIN + '/role';
  public static readonly ACTIVE_ROLES = UrlConstant.ROLE + '/actives';
  // User
  public static readonly USER = UrlConstant.ADMIN + '/user';
  // Product
  public static readonly PRODUCT = UrlConstant.ADMIN + '/product';
}
