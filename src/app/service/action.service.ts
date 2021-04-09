import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class ActionService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getActions(params): Observable<any> {
    return this.baseService.get(UrlConstant.ACTION, params);
  }

  getActionActives(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_ACTIONS);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ACTION, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ACTION, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ACTION, id);
  }
}
