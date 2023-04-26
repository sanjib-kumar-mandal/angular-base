import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  sizeCalculator(width: number, height?: number): number {
    if(width > 0 && width <= 319) {
      return 0;
    } else if(width >= 320 && width <= 480) {
      return 1;
    } else if(width >= 481 && width <= 768) {
      return 2;
    } else if(width >= 769 && width <= 1024) {
      return 3;
    } else if(width >= 1025 && width <= 1200) {
      return 4;
    } else {
      return 5;
    }
  }
}
