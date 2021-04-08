import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getProducts(params?): Observable<any> {
    return this.baseService.get(UrlConstant.PRODUCT, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.PRODUCT, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.PRODUCT, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.PRODUCT, id);
  }
}
