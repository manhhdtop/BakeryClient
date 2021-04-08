import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../service/app-config.service';
import { Constant } from '../constants/constant.class';

@Injectable()
export class BaseService {

  constructor(public httpClient: HttpClient, protected configService: AppConfigService) {
  }

  private static getToken(): string {
    return localStorage.getItem(Constant.TOKEN);
  }

  get(url: string, params?: {}, responseType?: string, timeout?: number): Observable<any> {
    url = this.configService.getConfig().api.baseUrl + url;
    switch (responseType) {
      case 'text':
        return this.httpClient.get(url, {
          headers: this.createHeaders(timeout) || {},
          params,
          responseType: 'text',
        });
      case 'blob':
        return this.httpClient.get(url, {
          headers: this.createHeaders(timeout) || {},
          params,
          responseType: 'blob',
        });
      case 'arraybuffer':
        return this.httpClient.get(url, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'arraybuffer',
          params,
        });
      default:
        return this.httpClient.get(url, {
          headers: this.createHeaders(timeout) || {},
          params,
        });
    }
  }

  async getWithAsync(url: string, params?: {}, responseType?: string): Promise<any> {
    url = this.configService.getConfig().api.baseUrl + url;
    switch (responseType) {
      case 'text':
        return await this.httpClient.get(url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params,
          responseType: 'text',
        }).toPromise();
      case 'blob':
        return await this.httpClient.get(url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params,
          responseType: 'blob',
        }).toPromise();
      case 'arraybuffer':
        return await this.httpClient.get(url, {
          headers: this.createHeaders() || {},
          responseType: 'arraybuffer',
          params,
        }).toPromise();
      default:
        return await this.httpClient.get(url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params,
        }).toPromise();
    }
  }

  /**
   * Create a new entity.
   * @param url the api url
   * @param data the entity to create
   * @param params params
   * @param responseType responseType
   * @param timeout timeout
   */
  put(url: string, data: any, params?: {}, responseType?: string, timeout?: number): Observable<any> {
    url = this.configService.getConfig().api.baseUrl + url;
    switch (responseType) {
      case 'text':
        return this.httpClient.put(url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'text',
          params,
        });
      case 'blob':
        return this.httpClient.put(url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'blob',
          params,
        });
      case 'arraybuffer':
        return this.httpClient.put(url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'arraybuffer',
          params,
        });
      default:
        return this.httpClient.put(url, data, {
          headers: this.createHeaders(timeout) || {},
          params,
        });
    }
  }

  /**
   * Update an entity.
   * @param url the api url
   * @param data the entity to be updated
   * @param responseType responseType
   * @param timeout timeout
   */
  post(url: string, data?: any, responseType?: string, timeout?: number): Observable<any> {
    url = this.configService.getConfig().api.baseUrl + url;
    switch (responseType) {
      case 'text':
        return this.httpClient.post(url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'text',
        });
      default:
        return this.httpClient.post(url, data, {
          headers: this.createHeaders(timeout) || {},
        });
    }
  }

  /**
   * Delete an entity.
   * @param url the api url
   * @param id the entity id to be deleted
   * @param responseType responseType
   */
  delete(url: string, id: any, responseType?: string): Observable<any> {
    url = this.configService.getConfig().api.baseUrl + url + '/' + id;
    switch (responseType) {
      case 'text':
        return this.httpClient.delete(url, {
          headers: this.createHeaders() || {},
          responseType: 'text',
        });
      default:
        return this.httpClient.delete(url, {
          headers: this.createHeaders() || {},
        });
    }
  }

  public createHeaders(timeout?: number): HttpHeaders {
    if (timeout) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + BaseService.getToken()).set('timeout', timeout.toString());
    } else {
      return new HttpHeaders().set('Authorization', 'Bearer ' + BaseService.getToken());
    }
  }

}
