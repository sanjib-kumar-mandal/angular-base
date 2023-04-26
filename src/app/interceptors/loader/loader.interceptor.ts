import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this._loading.setLoading(true, request.url);
    return next.handle(request);
    // .pipe(catchError((err) => {
    //   this._loading.setLoading(false, request.url);
    //   return err;
    // }))
    // .pipe(map<any>((evt: any) => {
    //   if(evt instanceof HttpResponse) {
    //     this._loading.setLoading(false, request.url);
    //   }
    //   return evt;
    // }));
  }
}
