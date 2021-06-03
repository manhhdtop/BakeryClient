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

  getAdminProducts(params?): Observable<any> {
    return this.baseService.get(UrlConstant.ADMIN_PRODUCT, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ADMIN_PRODUCT, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ADMIN_PRODUCT, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ADMIN_PRODUCT, id);
  }

  createSlug(name: string): Observable<any> {
    return this.baseService.get(UrlConstant.CREATE_PRODUCT_SLUG + '?productName=' + name);
  }

  getProducts(params?): Observable<any> {
    return this.baseService.get(UrlConstant.PRODUCT, params);
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.baseService.get(UrlConstant.PRODUCT + '/' + slug);
  }
}
