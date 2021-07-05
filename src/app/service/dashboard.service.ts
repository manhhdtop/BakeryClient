import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getDashboardOverview(): Observable<any> {
    return this.baseService.get(UrlConstant.DASHBOARD_OVERVIEW);
  }
}
