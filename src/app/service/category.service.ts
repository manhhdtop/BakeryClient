import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getParentCategories(): Observable<any> {
    return this.baseService.get(UrlConstant.PARENT_CATEGORIES);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ADMIN_CATEGORY, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ADMIN_CATEGORY, data);
  }

  getCategories(params): Observable<any> {
    return this.baseService.get(UrlConstant.ADMIN_CATEGORY, params);
  }

  getActiveCategories(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_CATEGORIES);
  }

  getCategoryBySlug(slug: string): Observable<any> {
    return this.baseService.get(UrlConstant.CATEGORY + slug);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ADMIN_CATEGORY, id);
  }

  createSlug(name: string): Observable<any> {
    return this.baseService.get(UrlConstant.CREATE_CATEGORY_SLUG + '?categoryName=' + name);
  }

  getMenuCategories(): Observable<any> {
    return this.baseService.get(UrlConstant.CATEGORY);
  }

}
