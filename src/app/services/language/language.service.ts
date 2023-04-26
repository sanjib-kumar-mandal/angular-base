import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Language } from 'src/app/pipes/language/language';
import {
  setBengaliLanguage,
  setHindiLanguage,
} from 'src/app/pipes/language/language.pipe';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';
import { LocalStorageKey } from '../storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  availableLanguages: Array<Language> = [
    Language.English,
    Language.Hindi,
    Language.Bengali,
  ];

  private languageObserver = new BehaviorSubject<Language>(null!);
  get languageState$() {
    return this.languageObserver.pipe(filter((el) => el !== null));
  }

  constructor(private storageService: LocalStorageService) {
    this.applyLanguage();
  }

  private async applyLanguage(): Promise<void> {
    // check language
    const languageSaved =
      (this.storageService.getItem(LocalStorageKey.Language) as Language) ??
      Language.English;
    const langResult = this.availableLanguages.includes(languageSaved)
      ? languageSaved
      : Language.English;
    // update language
    this.updateLanguage(langResult);
  }

  async updateLanguage(language: Language): Promise<void> {
    const lang = this.languageObserver.value;
    if (lang === Language.Bengali) await setBengaliLanguage();
    if (lang === Language.Hindi) await setHindiLanguage();
    if (lang !== language) {
      if (this.availableLanguages.includes(language)) {
        this.languageObserver.next(language);
        this.storageService.setItem(LocalStorageKey.Language, language);
      }
    }
  }
}
