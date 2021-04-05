import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../shared/constants/constant.class';
import { UrlConstant } from '../shared/constants/url.class';
import { AppConfigService } from './app-config.service';

@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private configService: AppConfigService,
  ) {
  }

  public static getToken(): string {
    return localStorage.getItem(Constant.TOKEN);
  }

  login(payload): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.LOGIN, payload, {
      headers,
    });
  }

  logout(): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.LOGOUT, null, {
      headers,
    });
  }

  refreshToken(): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.REFRESH_TOKEN, null, {
      headers,
    });
  }

  public createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + AuthService.getToken());
  }
}
