import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getProvinces(): Observable<any> {
    return this.baseService.get(UrlConstant.PROVINCES);
  }

  getDistricts(provinceId): Observable<any> {
    const params = {
      provinceId,
    };
    return this.baseService.get(UrlConstant.DISTRICTS, params);
  }
}
