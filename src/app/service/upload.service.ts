import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(
    private baseService: BaseService,
  ) {
  }

  uploadFile(formData): Observable<any> {
    return this.baseService.post(UrlConstant.UPLOAD, formData);
  }

  uploadFiles(formData): Observable<any> {
    return this.baseService.post(UrlConstant.UPLOADS, formData);
  }

  uploadImage(formData): Observable<any> {
    return this.baseService.post(UrlConstant.UPLOAD_IMAGE, formData);
  }

  uploadImages(formData): Observable<any> {
    return this.baseService.post(UrlConstant.UPLOAD_IMAGES, formData);
  }
}
