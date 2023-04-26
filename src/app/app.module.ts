import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformModule } from '@angular/cdk/platform';
import { HeaderInterceptor } from './interceptors/header/header.interceptor';
import { CachingInterceptor } from './interceptors/caching/caching.interceptor';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { ProfilingInterceptor } from './interceptors/profiling/profiling.interceptor';
import { environment } from 'src/environment/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PlatformModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    ...[
      environment.interceptorConditions.caching
        ? {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
          }
        : [],
    ],
    ...[
      environment.interceptorConditions.profiler
        ? {
            provide: HTTP_INTERCEPTORS,
            useClass: ProfilingInterceptor,
            multi: true,
          }
        : [],
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
