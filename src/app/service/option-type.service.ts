import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class OptionTypeService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getOptionTypes(params): Observable<any> {
    return this.baseService.get(UrlConstant.OPTION_TYPE, params);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.OPTION_TYPE, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.OPTION_TYPE, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.OPTION_TYPE, id);
  }
}
