import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { AppConfigService } from '../../service/app-config.service';
import { UrlConstant } from '../constants/url.class';
import { ToastService } from 'src/app/service/toast.service';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('Value default time-out');

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private appConfigService: AppConfigService,
    private modal: NgbModal,
    private router: Router,
    private toast: ToastService,
    @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
  ) {
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
        this.modal.dismissAll();
        if (error.status === 401) {
          localStorage.clear();
          const url = this.router.routerState.snapshot.url;
          this.router.navigate(['/login'], {queryParams: {returnUrl: url}});
          return throwError(error);
        } else if (error.status === 403) {
          this.router.navigate([UrlConstant.UNAUTHORIZED], {skipLocationChange: true});
          return throwError(error);
        }
        return throwError(error);
      }),
    );
  }
}
