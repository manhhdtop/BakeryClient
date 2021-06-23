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
    return this.baseService.get(UrlConstant.ADMIN_VOUCHER, params);
  }

  getVoucherActives(): Observable<any> {
    return this.baseService.get(UrlConstant.ACTIVE_VOUCHERS);
  }

  getVoucherByCode(code): Observable<any> {
    const param = {
      code
    };
    return this.baseService.get(UrlConstant.GET_VOUCHER_BY_CODE, param);
  }

  save(data): Observable<any> {
    return this.baseService.put(UrlConstant.ADMIN_VOUCHER, data);
  }

  update(data): Observable<any> {
    return this.baseService.post(UrlConstant.ADMIN_VOUCHER, data);
  }

  updateStatus(data): Observable<any> {
    return this.baseService.post(UrlConstant.UPDATE_STATUS_VOUCHER, data);
  }

  delete(id): Observable<any> {
    return this.baseService.delete(UrlConstant.ADMIN_VOUCHER, id);
  }

  generateCode(): Observable<any> {
    return this.baseService.get(UrlConstant.GENERATE_CODE);
  }

  checkCode(code): Observable<any> {
    const param = {
      code
    };
    return this.baseService.get(UrlConstant.CHECK_CODE, param);
  }
}
