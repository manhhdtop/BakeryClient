import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let timeoutValue: number;
    // if (req.headers.get('timeout')) {
    //   timeoutValue = Number(req.headers.get('timeout'));
    // } else {
    //   timeoutValue = this.appConfigService.getConfig()
    //     ? this.appConfigService.getConfig().timeoutValue : this.defaultTimeout;
    // }

    return next.handle(req).pipe();
  }

}
