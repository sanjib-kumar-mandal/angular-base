import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';
import { BehaviorSubject, filter } from 'rxjs';
import { LocalStorageKey } from '../storage/local-storage';
import { Theme, AvailableThemes, ThemeColors } from './theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeObserver = new BehaviorSubject<Theme>(null!);
  get themeState$() {
    return this.currentThemeObserver.pipe(filter((el) => el != null));
  }

  constructor(private storageService: LocalStorageService) {
    this.applyTheme();
  }

  private applyTheme(): void {
    // get the current theme
    const currentTheme =
      (this.storageService.getItem(LocalStorageKey.Theme) as Theme) ??
      Theme.Light;
    this.setTheme(
      AvailableThemes.includes(currentTheme) ? currentTheme : Theme.Light
    );
    // website theme color
    const body = document.body;
    const bodyClasses = body.classList;
    this.themeState$.subscribe((theme) => {
      if (theme === Theme.Dark) {
        if (bodyClasses.contains(Theme.Light)) {
          bodyClasses.remove(Theme.Light);
        }
        bodyClasses.add(Theme.Dark);
      } else if (theme === Theme.Light) {
        if (bodyClasses.contains(Theme.Dark)) {
          bodyClasses.remove(Theme.Dark);
        }
        bodyClasses.add(Theme.Light);
      }
    });
    // browser theme color
    const head = document.head;
    const headMeta = head.getElementsByTagName('meta');
    let hasThemeMeta = false;
    for (let i = 0, l = headMeta.length; i < l; i++) {
      if (headMeta[i].name === 'theme-color') {
        hasThemeMeta = true;
        break;
      }
    }
    this.themeState$.subscribe((theme) => {
      if (!hasThemeMeta) {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content =
          theme === Theme.Dark
            ? ThemeColors[Theme.Dark]
            : ThemeColors[Theme.Light];
        head.appendChild(meta);
        const msapplicationmeta = document.createElement('meta');
        msapplicationmeta.name = 'msapplication-navbutton-color';
        msapplicationmeta.content =
          theme === Theme.Dark
            ? ThemeColors[Theme.Dark]
            : ThemeColors[Theme.Light];
        head.appendChild(msapplicationmeta);
        const applemeta = document.createElement('meta');
        applemeta.name = 'apple-mobile-web-app-status-bar-style';
        applemeta.content =
          theme === Theme.Dark
            ? ThemeColors[Theme.Dark]
            : ThemeColors[Theme.Light];
        head.appendChild(applemeta);
      } else {
        const meta = head.getElementsByTagName('meta');
        for (let index = 0, l = meta.length; index < l; index++) {
          if (meta[index].name === 'theme-color') {
            meta[index].content =
              theme === Theme.Dark
                ? ThemeColors[Theme.Dark]
                : ThemeColors[Theme.Light];
          } else if (meta[index].name === 'msapplication-navbutton-color') {
            meta[index].content =
              theme === Theme.Dark
                ? ThemeColors[Theme.Dark]
                : ThemeColors[Theme.Light];
          } else if (
            meta[index].name === 'apple-mobile-web-app-status-bar-style'
          ) {
            meta[index].content =
              theme === Theme.Dark
                ? ThemeColors[Theme.Dark]
                : ThemeColors[Theme.Light];
          }
        }
      }
    });
  }

  setTheme(theme: Theme): void {
    const currentTheme = this.currentThemeObserver.value;
    if (currentTheme !== theme) {
      this.currentThemeObserver.next(theme);
      this.storageService.setItem(LocalStorageKey.Theme, theme);
    }
  }
}
