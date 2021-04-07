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
    return this.baseService.put(UrlConstant.CATEGORY, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.CATEGORY, data);
  }

  getCategories(nameParam): Observable<any> {
    let param = '';
    if (nameParam && nameParam !== '') {
      param = '?name=' + nameParam;
    }
    return this.baseService.get(UrlConstant.CATEGORY + param);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.CATEGORY, id);
  }
}