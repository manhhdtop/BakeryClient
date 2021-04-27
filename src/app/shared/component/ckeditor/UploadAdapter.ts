import { Injectable } from '@angular/core';
import { AppConfigService } from '../../../service/app-config.service';
import { UrlConstant } from '../../constants/url.class';

@Injectable()
export class UploadAdapter {
  loader: any;
  xhr: any;
  baseUrl: string;

  constructor(loader) {
    this.loader = loader;
    this.baseUrl = AppConfigService.instance.getConfig().api.baseUrl;
  }

  // Starts the upload process.
  upload(): Promise<any> {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject, file);
      this._sendRequest(file);
    }));
  }

  abort(): void {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest(): void {
    const xhr = this.xhr = new XMLHttpRequest();

    xhr.open('POST', this.baseUrl + UrlConstant.UPLOAD_IMAGES, true);
    xhr.responseType = 'json';
  }

  _initListeners(resolve, reject, file): void {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error) {
        console.log('error: ', response);
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      for (const image of response) {
        resolve({
          default: this.baseUrl + image.uri,
        });
      }
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file): void {
    // Prepare the form data.
    const data = new FormData();

    data.append('files', file);

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }
}
