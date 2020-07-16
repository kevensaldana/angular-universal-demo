import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private urlDomain = environment.urlDomain;
  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()) {
    return this.http.get<T>(`${this.urlDomain}/${path}`, {
      params,
      headers
    });
  }

  post<T>(path: string, body: any, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.post<T>(`${this.urlDomain}/${path}`, body, {
      headers
    });
  }
}
