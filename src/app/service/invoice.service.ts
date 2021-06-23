import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getInvoices(): Observable<any> {
    return this.baseService.get(UrlConstant.ADMIN_INVOICE);
  }

  createInvoice(data): Observable<any> {
    return this.baseService.post(UrlConstant.CREATE_INVOICE, data);
  }
}
