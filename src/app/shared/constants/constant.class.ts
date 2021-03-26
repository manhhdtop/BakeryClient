export class Constant {
  public static readonly DATE_FMT = 'dd/MM/yyyy';
  public static readonly DATE_DDMMYY_HHMMSS = 'dd/MM/yyyy HH:mm:ss';
  public static readonly SUCCESS = 'Success';
  public static readonly MESSAGE_ADD_SUCCESS = 'Success';
  public static readonly MESSAGE_UPDATE_SUCCESS = 'Success';
  public static readonly TOKEN = 'token';
  public static readonly USER_TOKEN = 'user_token';
  public static readonly USER_INFO = 'user_info';
  public static readonly LOGIN_FAIL = 'login_failed';
  public static readonly ACTION = {
    VIEW: 'VIEW',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
  };
  public static readonly SCREEN = {
    MENU: 'menu',
    ROLE: 'role',
    USER: 'user',
    GROUP: 'group',
    CATEGORY: 'category',
    MERCHANT: 'merchant',
    TERMINAL: 'terminal',
  };

  // Upload Image
  public static readonly DEFAULT_IMG_WIDTH = 500;
  public static readonly DEFAULT_IMG_HEIGHT = 500;
  public static readonly DEFAULT_MIN_IMG_WIDTH = 10;
  public static readonly DEFAULT_MIN_IMG_HEIGHT = 10;
  public static readonly DEFAULT_MAX_IMG_WIDTH = 1024;
  public static readonly DEFAULT_MAX_IMG_HEIGHT = 1024;
  public static readonly DEFAULT_IMG_MAX_SIZE = 2048; // KB
  public static readonly DEFAULT_IMG_MIN_SIZE = 16; // KB
  public static readonly DEFAULT_IMG_TYPE = ['jpg', 'jpeg', 'png'];
  public static readonly DEFAULT_IMG_ICON_CLASS = 'upload';
  public static readonly DEFAULT_IMG_NAME = 'image';
  public static readonly DEFAULT_IMG_LABEL = 'image_label';
  public static readonly VALID_FILE = 'Vui lòng chọn file upload';
}
