import { Pipe, PipeTransform } from '@angular/core';
import { Language } from './language';

let bengaliLanguage: { [key: string]: string } = {};
let hindiLanguage: { [key: string]: string } = {};

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {
  transform(value: string, language: Language): string {
    if (language === Language.Bengali) {
      return bengaliLanguage[value] ?? value;
    } else if (language === Language.Hindi) {
      return hindiLanguage[value] ?? value;
    } else {
      return value;
    }
  }
}
export async function setHindiLanguage() {
  if (!Object.keys(hindiLanguage).length) {
    hindiLanguage = await fetch('./../../../assets/langauges/hindi.json').then(
      (res) => res.json()
    );
  }
}

export async function setBengaliLanguage() {
  if (!Object.keys(bengaliLanguage).length) {
    bengaliLanguage = await fetch(
      './../../../assets/langauges/bengali.json'
    ).then((res) => res.json());
  }
}
