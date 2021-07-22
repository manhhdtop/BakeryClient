import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstant } from 'src/app/shared/constants/url.class';
import { BaseService } from 'src/app/shared/base-service/base-service.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private baseService: BaseService,
  ) {
  }


  search(params): Observable<any> {
    return this.baseService.get(UrlConstant.SEARCH, params);
  }

}
