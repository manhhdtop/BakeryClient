import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getVouchers(params): Observable<any> {
    return this.baseService.get(UrlConstant.VOUCHER, params);
  }

  getVoucherActives(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_VOUCHERS);
  }

  getVoucherByCode(): Observable<any> {
    return this.baseService.get(UrlConstant.GET_VOUCHER_BY_CODE);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.VOUCHER, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.VOUCHER, data);
  }

  updateStatus(data): Observable<any> {
    return this.baseService.post(UrlConstant.UPDATE_STATUS_VOUCHER, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.VOUCHER, id);
  }

  generateCode(): Observable<any> {
    return this.baseService.get(UrlConstant.GENERATE_CODE);
  }
}
