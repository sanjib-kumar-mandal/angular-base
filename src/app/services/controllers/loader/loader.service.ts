import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loaderState = new BehaviorSubject<boolean>(false);
  isLoading = this.loaderState.asObservable();

  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  /**
   * Sets the loaderState property value based on the following:
   * - if the loading is true add the provided url to the loading map with a true value, set loaderState value to true
   * - if loading is false, remove loading map entry and only when the map is empty will we set loaderState to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment the function is called from the @link{HttpRequestInterceptor}
   * @param loading { boolean }
   * @param url { string }
   */
  setLoading(loading: boolean, url: string) {
    if(!url) {
      throw new Error("The request URL must be provided to the LoadingService.setLoader function");
    }
    if(loading === true) {
      this.loadingMap.set(url, loading);
      this.loaderState.next(true);
    } else if(loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if(this.loadingMap.size === 0) {
      this.loaderState.next(false);
    }
  }
}
