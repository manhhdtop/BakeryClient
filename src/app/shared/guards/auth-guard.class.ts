import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Constant } from '../constants/constant.class';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  loginUrl: string;
  roleAdmin: string;

  constructor(
    private router: Router,
  ) {
    this.loginUrl = '/admin/login';
    this.roleAdmin = 'ADMINISTRATOR';
  }

  canLoad(route: Route): boolean {
    if (AuthService.isLoggedIn()) {
      const user: User = JSON.parse(localStorage.getItem(Constant.USER_INFO));
      const roles = user.roles.filter(e => {
        return e.code === this.roleAdmin;
      });
      if (roles && roles.length === 1) {
        return true;
      }
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (AuthService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([this.loginUrl], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
