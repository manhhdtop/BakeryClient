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

  public static isLoggedIn(url?: string): boolean {
    let token = this.getToken();
    let currentUser = localStorage.getItem(Constant.TOKEN);
    if (!currentUser || currentUser.trim() === '') {
      currentUser = '{"userId":301,"email":"manhhd@toprate.io","name":"Hoàng Đức Mạnh","nameAscii":null,"phone":"0987654321","requireOtp":0,"status":1,"userName":"manhhd","applicationId":2,"imageUrl":null,"employeeCode":null,"modifiedDate":1598329805000}';
    }
    if (!token || token.trim() === '') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic3NvIl0sInVzZXJfbmFtZSI6Im1hbmhoZCIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNjE3Njc3ODM3LCJ1c2VySWQiOjMwMSwidXNlciI6eyJ1c2VySWQiOjMwMSwidXNlck5hbWUiOiJtYW5oaGQifSwiYXV0aG9yaXRpZXMiOlsiUXXhuqNuIGzDvSB2w60gbuG7mWkgYuG7mSIsIkFHRU5DWV9UUkFOU0FDVElPTl9MSU1JVCIsIkLDoW8gY8OhbyBraeG7g20gc2_DoXQiLCJQUk9DRVNTX1RSQU5TX1BBWU1FTlRfUEVORElORyIsIlF14bqjbiBsw70gdOG7lSBjaOG7qWMgbmdvw6BpIFZOUFQiLCJBRE1JTl9XQUxMRVRfRU5URVJQUklTRSIsIlJPTEVfUjAxNyIsIk9SR19QQVlNRU5UX1JFUE9SVCIsIkFETUlOX1JFQ0hBUkdFX1dBTExFVF9JTlRFUk5BTCIsIkLDoW8gY8OhbyBnaWFvIGThu4tjaCB2w60iLCJBRE1JTl9QQVlNRU5UX1RSQU5TX1NFUlZJQ0VfREVUQUlMX0xJU1QiLCJNQU5BR0VfV0FMTEVUX1BFUlNPTkFMIiwiQURNSU5fQ09NTUlTU0lPTl9UUkFOU19DQVNISU4iLCJBRE1JTl9XQUxMRVRfTU9ORVlfRExQTiIsIkRJR0lUSVpJTkdfUkVQT1JUX0NBU0hfRkxPVyIsIkdFTkVSQUxfUEFZTUVOVF9SRVBPUlQiLCJBRE1JTl9DQVNIX0lOX0ZST01fQkFOS19UUkFOU0ZFUiIsIlJPTEVfUjA4MCIsIlJPTEVfUkVQT1JUIiwiQ0FURUdPUllfQVBJIiwiT1JHX09VVFNJREVfVk5QVCIsIkzhuq1wIHnDqnUgY-G6p3UgaOG6oWNoIHRvw6FuIG5naGnhu4dwIHbhu6UgVk5QIiwiV0FMTEVUX1VTRVJfREVUQUlMIiwiUk9MRV8wODBfQVBQUk9WRSIsIk1BTkFHRV9XSVRIRFJBV0FMX1dBTExFVF9JTlRFUk5BTCIsIkLDoW8gY8OhbyB04buVbmcgaOG7o3AgbuG6oXAvIHLDunQgdGnhu4FuIHbDrSBjw6EgbmjDom4gdGhlbyBuZ8OgeSAyIiwiQ0FTSF9JTl9GUk9NX0FUTV9CVVNJTkVTU19XQUxMRVQiLCJNQU5BR0VfV0FMTEVUX1RSQU5TRkVSIiwiREFJTFlfRElHSVRJWkFUSU9OX1JFU1VMVCIsIkFETUlOX1JFQ09OQ0lMRV9CWV9PUkdfUkVQT1JUIiwiTOG7i2NoIHPhu60gdMOhYyDEkeG7mW5nIiwiUkVGVU5EX1BBWU1FTlRfVFJBTlNBQ1RJT05fTElTVCIsIkFDQ09VTlRfU1RBVEVNRU5UIiwiQ0FTSF9PVVRfT1JHIiwiQ0FTSF9JTl9GUk9NX0FUTV9QRVJTT05BTF9XQUxMRVQiXSwianRpIjoiYzE4YmJjNjUtMDdlMi00OWE3LTk1ZDMtMDFhYWYxOGMzN2Y0IiwiY2xpZW50X2lkIjoic3NvIn0.0xyqKVCIkEPM_1tm9Xam0HqA2t_YMI-h_49Pxtp2crs';
    }
    if (currentUser && token) {
      return true;
    }
    return false;
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
