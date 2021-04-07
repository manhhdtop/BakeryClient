import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public static isLoggedIn(): boolean {
    const token = this.getToken();
    const currentUser = localStorage.getItem(Constant.TOKEN);

    return !!(currentUser && token);
  }

  login(payload): Observable<any> {
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.LOGIN, payload, {});
  }

  logout(): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.LOGOUT, null, {
      headers,
    });
  }

  checkToken(): Observable<any> {
    const headers = this.createHeaders();
    return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.CHECK_TOKEN, null, {
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
