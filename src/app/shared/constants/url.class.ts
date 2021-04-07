export class UrlConstant {
  public static readonly LOGIN = '/auth/login';
  public static readonly LOGOUT = '/auth/logout';
  public static readonly CHECK_TOKEN = '/auth/check-token';
  public static readonly REFRESH_TOKEN = '/auth/refresh-token';
  public static readonly ADMIN = '/admin';
  public static readonly UNAUTHORIZED = '/unauthorized';
  public static readonly PAGE_NOT_FOUND = '/page-not-found';
  public static readonly INTERNAL_SERVER_ERROR = '/internal-server-error';
  public static readonly UPLOAD = '/upload';
  public static readonly CATEGORY = UrlConstant.ADMIN + '/category';
  public static readonly PARENT_CATEGORIES = UrlConstant.CATEGORY + '/parents';
}
