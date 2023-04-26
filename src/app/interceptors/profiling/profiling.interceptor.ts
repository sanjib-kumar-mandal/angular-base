import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class ProfilingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (environment.production) {
      return next.handle(request);
    } else {
      const started = Date.now();
      let ok: string;
      return next.handle(request).pipe(
        tap(
          (event: HttpEvent<any>) =>
            (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          (error: HttpErrorResponse) => (ok = 'failed')
        ),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.log(msg);
        })
      );
    }
  }
}
