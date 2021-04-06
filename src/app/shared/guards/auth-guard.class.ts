import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth.service';

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
    if (AuthService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([this.loginUrl]);
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
