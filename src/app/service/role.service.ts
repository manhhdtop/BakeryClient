import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getRoles(params): Observable<any> {
    return this.baseService.get(UrlConstant.ROLE, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ROLE, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ROLE, data);
  }

  getActiveRoles(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_ROLES);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ROLE, id);
  }
}
