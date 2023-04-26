import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalSufix',
})
export class OrdinalSufixPipe implements PipeTransform {
  transform(value: number): string {
    const j = value % 10,
      k = value % 100;
    if (j === 1 && k !== 11) {
      return value + 'st';
    } else if (j === 2 && k !== 12) {
      return value + 'nd';
    } else if (j === 3 && k !== 13) {
      return value + 'rd';
    } else {
      return value + 'th';
    }
  }
}
