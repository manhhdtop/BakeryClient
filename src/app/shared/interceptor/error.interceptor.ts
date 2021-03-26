import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlConstant } from '../constants/url.class';
import { AppConfigService } from '../../../app-config.service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('Value default time-out');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private appConfigService: AppConfigService,
              @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let timeoutValue: number;
    if (req.headers.get('timeout')) {
      timeoutValue = Number(req.headers.get('timeout'));
    } else {
      timeoutValue = this.appConfigService.getConfig()
        ? this.appConfigService.getConfig().timeoutValue : this.defaultTimeout;
    }
    return next.handle(req).pipe(
      timeout(timeoutValue),
      retry(0),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          const url = this.router.routerState.snapshot.url;
          this.router.navigate([UrlConstant.LOGIN], {queryParams: {returnUrl: url}});
          return throwError(error);
        } else if (error.status === 403) {
          this.router.navigate([UrlConstant.UNAUTHORIZED]);
          return throwError(error);
        } else if (error.status === 404) {
          this.router.navigate([UrlConstant.PAGE_NOT_FOUND]);
        }
        return throwError(error);
      })
    );
  }
}
