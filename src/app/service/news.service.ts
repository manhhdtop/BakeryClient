import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getAdminNews(params): Observable<any> {
    return this.baseService.get(UrlConstant.ADMIN_NEWS, params);
  }

  getNews(params): Observable<any> {
    return this.baseService.get(UrlConstant.NEWS, params);
  }

  getNewsActives(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_NEWS);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ADMIN_NEWS, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ADMIN_NEWS, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ADMIN_NEWS, id);
  }

  createSlug(name: string): Observable<any> {
    const params = {
      name,
    };
    return this.baseService.get(UrlConstant.CREATE_NEWS_SLUG, params);
  }

  getNewsBySlug(slug: string): Observable<any> {
    return this.baseService.get(UrlConstant.NEWS + slug);
  }

  getHomeNews(): Observable<any> {
    return this.baseService.get(UrlConstant.HOME_NEWS);
  }

}
