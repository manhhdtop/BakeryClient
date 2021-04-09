import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getUsers(params): Observable<any> {
    return this.baseService.get(UrlConstant.USER, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.USER, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.USER, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.USER, id);
  }
}
