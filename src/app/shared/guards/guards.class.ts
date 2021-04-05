import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Router,
  Route,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../constants/constant.class';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  loginUrl: string;

  constructor(
    private router: Router,
  ) {
    this.loginUrl = '/admin/login';
  }

  canLoad(route: Route): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate([this.loginUrl]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn(state.url);
  }

  isLoggedIn(url?: string): boolean {
    const token = localStorage.getItem(Constant.TOKEN);
    const currentUser = JSON.parse(localStorage.getItem(Constant.USER_INFO));
    if (currentUser && token) {
      return true;
    }
    this.router.navigate([this.loginUrl], {queryParams: {returnUrl: url}});
    return false;
  }
}
