import {Constant} from './constant.class';

export class CheckAction {
  public static getListPermission() {
    const listPermission = new Set();
    const userInfo = JSON.parse(localStorage.getItem(Constant.USER_INFO));
    if (userInfo.roles != null) {
      userInfo.roles.filter(item => {
        item.actions.filter(action => {
          listPermission.add(action.name);
        });
      });
    }
    if (userInfo.groups != null) {
      userInfo.groups.forEach(group => group.roleResponses.forEach(item => {
        item.actions.forEach(action => {
          listPermission.add(action.name);
        });
      })
      );
    }
    return listPermission;
  }
}

