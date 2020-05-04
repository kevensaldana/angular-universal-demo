import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams(), headers: HttpHeaders = new HttpHeaders()) {
    return this.http.get<T>(`${path}`, {
      params,
      headers
    });
  }

  post<T>(path: string, body: any, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.post<T>(`${path}`, body, {
      headers
    });
  }
}
