import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  getContacts(params): Observable<any> {
    return this.baseService.get(UrlConstant.ADMIN_CONTACT, params);
  }

  newContact(data): Observable<any> {
    return this.baseService.post(UrlConstant.NEW_CONTACT, data);
  }

  updateStatus(data): Observable<any> {
    return this.baseService.post(UrlConstant.CONTACT_UPDATE_STATUS, data);
  }
}
