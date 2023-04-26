import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { LanguageService } from './services/language/language.service';
import { SeoService } from './services/seo/seo.service';
import { PlatformService } from './services/platform/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'base';
  constructor(
    public platformService: PlatformService,
    public themeService: ThemeService,
    public languageService: LanguageService,
    public seoService: SeoService) {}
}
