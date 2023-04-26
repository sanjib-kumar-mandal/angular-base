import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get = <T>(url: string): Observable<T> => this.http.get<T>(url);

  post = <T>(url: string, body: any): Observable<T> => this.http.post<T>(url, body);

  delete = <T>(url: string): Observable<T> => this.http.delete<T>(url);

  put = <T>(url: string, body: any): Observable<T> => this.http.put<T>(url, body);

  patch = <T>(url: string, body: any): Observable<T> => this.http.patch<T>(url, body);

  jsonp = <T>(url: string, callbackparam: any): Observable<T> => this.http.jsonp<T>(url, callbackparam);

  request = <T>(method: string, url: string, options?: any) => this.http.request(method, url, options);
}
