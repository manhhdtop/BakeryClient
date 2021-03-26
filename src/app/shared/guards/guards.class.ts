import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Constant } from '../constants/constant.class';
import { UrlConstant } from '../constants/url.class';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router) {
  }

  canLoad(route: Route): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate([UrlConstant.LOGIN]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check authentication
    return this.isLoggedIn(state.url);
  }

  isLoggedIn(url?: string): boolean {
    const token = localStorage.getItem(Constant.TOKEN);
    const currentUser = JSON.parse(localStorage.getItem(Constant.USER_INFO));
    if (currentUser && token) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate([UrlConstant.LOGIN], {queryParams: {returnUrl: url}});
    return false;
  }
}
