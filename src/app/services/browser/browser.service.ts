import { Injectable } from '@angular/core';
import { BrowserOptions, BrowserTarget } from './browser';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  openBrowser(url: string, target: BrowserTarget = BrowserTarget._blank, options?: BrowserOptions): void {
    if(options) {
      let feature = '';
      const arr = Object.keys(options);
      arr.forEach((el, i) => {
        if(typeof (options as any)[el] === 'string' || typeof (options as any)[el] === 'number') {
          feature += `${(i < (arr.length - 1)) ? ',' : ''}${el}=${(options as any)[el]}`;
        }
      })
      if(feature) feature = feature.slice(1);
      if(options.callback) {
        options.callback(window.open(url, target, feature));
      } else {
        window.open(url, target, feature);
      }
    } else {
      window.open(url, target);
    }
  }
}
