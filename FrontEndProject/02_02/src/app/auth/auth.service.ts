import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  url = "https://localhost:44316/api/account";
  loginUrl = "https://localhost:44316/api/account/login";

  constructor(private http: HttpClient) { }

  register(credential) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // const options = { headers, responseType: 'text' as 'json' };
    return this.http.post<any>(this.url, credential);
  }

  login(credential) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.loginUrl, credential);
  }

 
}
