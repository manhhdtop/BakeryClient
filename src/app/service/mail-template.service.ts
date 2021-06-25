import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class MailTemplateService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  search(params?): Observable<any> {
    return this.baseService.get(UrlConstant.MAIL_TEMPLATE, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.MAIL_TEMPLATE, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.MAIL_TEMPLATE, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.MAIL_TEMPLATE, id);
  }
}
