import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfigService} from '../../../app-config.service';
import {Constant} from '../constants/constant.class';

@Injectable()
export class BaseService {

  constructor(
    public httpClient: HttpClient,
    protected configService: AppConfigService
  ) {
  }

  get(url: string, params?: {}, responseType?: string, timeout?: number): Observable<any> {
    switch (responseType) {
      case 'text':
        return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders(timeout).set('skipLoading', 'true') || {},
          params,
          responseType: 'text',
        });
      case 'blob':
        return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders(timeout).set('skipLoading', 'true') || {},
          params,
          responseType: 'blob',
        });
      case 'arraybuffer':
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'arraybuffer',
          params
        });
      default:
        return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders(timeout).set('skipLoading', 'true') || {},
          params
        });
    }
  }

  async getWithAsync(url: string, params?: {}, responseType?: string) {
    switch (responseType) {
      case 'text':
        return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params,
          responseType: 'text',
        }).toPromise();
      case 'blob':
        return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params,
          responseType: 'blob',
        }).toPromise();
      case 'arraybuffer':
        return await this.httpClient.post(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders() || {},
          responseType: 'arraybuffer',
          params
        }).toPromise();
      default:
        return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders().set('skipLoading', 'true') || {},
          params
        }).toPromise();
    }
  }

  /**
   * Create a new entity.
   * @param url the api url
   * @param data the entity to create
   */
  post(url: string, data: any, params?: {}, responseType?: string, timeout?: number): Observable<any> {
    switch (responseType) {
      case 'text':
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'text',
          params
        });
      case 'blob':
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'blob',
          params
        });
      case 'arraybuffer':
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'blob',
          params
        });
      default:
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
          params
        });
    }
  }

  /**
   * Update an entity.
   * @param url the api url
   * @param data the entity to be updated
   */
  put(url: string, data: any, responseType?: string, timeout?: number): Observable<any> {
    switch (responseType) {
      case 'text':
        return this.httpClient.put(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
          responseType: 'text'
        });
      default:
        return this.httpClient.put(this.configService.getConfig().api.baseUrl + url, data, {
          headers: this.createHeaders(timeout) || {},
        });
    }
  }

  /**
   * Delete an entity.
   * @param url the api url
   * @param params
   * @param id the entity id to be deleted
   * @param responseType
   */
  delete(url: string, params?: {}, id?: any, responseType?: string): Observable<any> {
    switch (responseType) {
      case 'text':
        return this.httpClient.delete(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders() || {},
          responseType: 'text',
          params
        });
      default:
        return this.httpClient.delete(this.configService.getConfig().api.baseUrl + url, {
          headers: this.createHeaders() || {},
          params
        });
    }
  }

  public createHeaders(timeout?: number) {
    // Why "authorization": see CustomLogoutSuccessHandler on server
    if (timeout) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()).set('timeout', timeout.toString());
    } else {
      return new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    }
  }

  private getToken() {
    return localStorage.getItem(Constant.TOKEN);
  }

}
