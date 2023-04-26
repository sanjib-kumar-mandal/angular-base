import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '../language/language.service';
import { DOCUMENT } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs';
import { Language } from 'src/app/pipes/language/language';

const SITE_NAME = 'Koniat';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private readonly defaultTitle = 'Welcome to koniat';
  private readonly defaultDescription = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    @Inject(DOCUMENT) private doc: Document) {     
      const headTag = this.doc.head;
      this.languageService.languageState$.subscribe({
        next: (language) => {
          this.setContentLanguageMataTag(headTag, language);
        }
      })
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)).subscribe({
          next: (seoData: any) => {
            this.setDefaultMetaTag(headTag, seoData?.localMeta);
            this.setCannonicalUrl(headTag, seoData?.localMeta);
            this.setIndexableStatus(headTag, seoData?.localMeta);
            this.setContentType(headTag, seoData?.localMeta);
            this.setRatingMeta(headTag, seoData?.localMeta);
            this.setOpenGraph(headTag, seoData?.localMeta);
            this.setTwitterCards(headTag, seoData?.localMeta);
          }
      })
  }

  private setDefaultMetaTag(headTag: HTMLHeadElement, metaData: any): void {
    this.doc.title = metaData?.default?.title ?? this.defaultTitle;
    const updateMetaTag = (name: string, value: string) => {
      const tags = headTag.getElementsByTagName('meta');
      for(let i = 0, l = tags.length; i < l; i++) {
        if(tags[i].name === name) {
          tags[i].content = value;
        }
      }
    }
    const addMetaTag = (name: string, value: string) => {
      const tag = this.doc.createElement('meta');
      tag.setAttribute('name', name);
      tag.setAttribute('content', value);
      headTag.appendChild(tag);
    }
    const hasMetaTag = (name: string): boolean => {
      let hasMetaTag = false;
      const metas = headTag.getElementsByTagName('meta');
      for(let i = 0, l = metas.length; i < l; i++) {
        if(metas[i].name === name) {
          hasMetaTag = true;
        }
      }
      return hasMetaTag;
    }
    // description tag
    if(hasMetaTag('description')) updateMetaTag('description', metaData?.default?.title ?? this.defaultDescription);
    else addMetaTag('description', metaData?.default?.description ?? this.defaultDescription);
  }

  // set cannonical URL
  private setCannonicalUrl(headTag: HTMLHeadElement, metaData: any): void {
    const addCanonicalUrl = (url: string) => {
      const link = this.doc.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      headTag.appendChild(link);
    }
    const removeCannonicalUrl = () => {
      const links = headTag.getElementsByTagName('link');
      for(let i = 0, l = links.length; i < l; i++) {
        if(links[i].rel === 'canonical') {
          links[i].remove();
          break;
        }
      }
    }
    if(metaData?.hasOwnProperty('setCanonical') && !metaData.setCanonical) {
      removeCannonicalUrl();
    } else {
      const url = `${window.location.origin}${window.location.pathname}`;
      const linkElements = headTag.getElementsByTagName('link');
      let hasCanonicalLink = false;
      for(let i = 0, l = linkElements.length; i < l; i++) {
        if(linkElements[i].rel === 'canonical') {
          if(linkElements[i].href !== url) {
            linkElements[i].href = url;
          }
          hasCanonicalLink = true;
          break;
        }
      }
      if(!hasCanonicalLink) {
        addCanonicalUrl(url);
      }
    }
  }

  // set indexable status
  private setIndexableStatus(headTag: HTMLHeadElement, seoData: any): void {
    const setNoIndex = () => {
      const metas = headTag.getElementsByTagName('meta');
      let hasTag = false;
      for(let i = 0, l = metas.length; i < l; i++) {
        if(metas[i].name === 'robots') {
          hasTag = true;
          break;
        }
      }
      if(!hasTag) {
        const metag = this.doc.createElement('meta');
        metag.name = 'robots';
        metag.content = 'noindex,nofollow';
        headTag.appendChild(metag);
      }
    }
    const setIndex = () => {
      const metas = headTag.getElementsByTagName('meta');
      let hasTag = false;
      for(let i = 0, l = metas.length; i < l; i++) {
        if(metas[i].name === 'robots') {
          hasTag = true;
          break;
        }
      }
      if(!hasTag) {
        const metag = this.doc.createElement('meta');
        metag.name = 'robots';
        metag.content = 'index, follow';
        headTag.appendChild(metag);
      }
    }
    const pathName = window.location.pathname.split('/');
    if(pathName.includes('admin')) {
      if(seoData?.hasOwnProperty('isIndexable') && seoData.isIndexable) {
        setIndex();
      } else {
        setNoIndex();
      }
    } else {
      setIndex();
    }
  }

   // set content type
   private setContentType(headTag: HTMLHeadElement, seoData: any): void {
    const addContentType = (contentType: string): void => {
      const tag = this.doc.createElement('meta');
      tag.httpEquiv = 'Content-Type';
      tag.content = contentType ?? 'text/html; charset=utf-8';
      headTag.appendChild(tag);
    }
    const httpEqvTag = headTag.getElementsByTagName('meta');
    let hasEqvTag = false;
    for(let i = 0, l = httpEqvTag.length; i < l; i++) {
      if(httpEqvTag[i].httpEquiv === 'Content-Type') {
        hasEqvTag = true;
      }
    }
    if(!hasEqvTag) {
      addContentType(seoData?.setContentType);
    }
  }

  // rating of the website page
  private setRatingMeta(headTag: HTMLHeadElement, seoData: any): void {
    const addRatingTag = (seoRating: string) => {
      const ratingTag = this.doc.createElement('meta');
      ratingTag.name = 'rating';
      ratingTag.content = seoRating ?? 'general';
      headTag.appendChild(ratingTag);
    }
    const ratingTag = this.doc.getElementsByTagName('meta');
    let hasRatingTag = false;
    for(let i = 0, l = ratingTag.length; i < l; i++) {
      if(ratingTag[i].name === 'rating') {
        hasRatingTag = true;
        ratingTag[i].content = seoData?.rating ?? 'general';
        break;
      }
    }
    if(!hasRatingTag) {
      addRatingTag(seoData?.rating);
    }
  }

  // website current language meta tag
  private setContentLanguageMataTag(headTag: HTMLHeadElement, language: Language): void {
    const addLanguageMeta = () => {
      const metaTag = this.doc.createElement('meta');
      metaTag.httpEquiv = 'content-language';
      metaTag.content = language;
      headTag.appendChild(metaTag);
    }
    let hasMetaTag = false;
    const metaLanguage = headTag.getElementsByTagName('meta');
    for(let i = 0, l = metaLanguage.length; i < l; i++) {
      if(metaLanguage[i].httpEquiv === 'content-language') {
        metaLanguage[i].content = language;
        hasMetaTag = true;
        break;
      }
    }
    if(!hasMetaTag) {
      addLanguageMeta();
    }
  }

  // set open graph
  private setOpenGraph(headTag: HTMLHeadElement, seoData: any): void {
    const addOpenGraphTags = () => {
      // og type
      const type = this.doc.createElement('meta');
      type.setAttribute('property', 'og:type');
      type.setAttribute('content', seoData?.default?.type ?? 'website');
      headTag.appendChild(type);
      // og title
      const title = this.doc.createElement('meta');
      title.setAttribute('property', 'og:title');
      title.setAttribute('content', seoData?.default?.title ?? this.defaultTitle);
      headTag.appendChild(title);
      // og description
      const description = this.doc.createElement('meta');
      description.setAttribute('property', 'og:description');
      description.setAttribute('content', seoData?.default?.description ?? this.defaultDescription);
      headTag.appendChild(description);
      // og description
      const site_name = this.doc.createElement('meta');
      site_name.setAttribute('property', 'og:site_name');
      site_name.setAttribute('content', SITE_NAME);
      headTag.appendChild(site_name);
      // og description
      const url = this.doc.createElement('meta');
      url.setAttribute('property', 'og:url');
      url.setAttribute('content', `${window.location.origin}${window.location.pathname}`);
      headTag.appendChild(url);
      // og description
      const image = this.doc.createElement('meta');
      image.setAttribute('property', 'og:image');
      image.setAttribute('content', `${window.location.origin}${seoData?.default?.image ?? '/assets/images/illustrations/dark/banner.svg'}`);
      headTag.appendChild(image);
    }

    const updateTags = () => {
      const metas = headTag.getElementsByTagName('meta');
      for(let i = 0, l = metas.length; i < l; i++) {
        const attributes = metas[i].attributes;
        for(let j = 0, le = attributes.length; j < le; j++) {
          if(attributes[j].name === 'property' && attributes[j].value === 'og:type') {
            metas[i].content = seoData?.default?.type ?? 'website';
          } else if(attributes[j].name === 'property' && attributes[j].value === 'og:title') {
            metas[i].content = seoData?.default?.title ?? this.defaultTitle;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'og:description') {
            metas[i].content = seoData?.default?.description ?? this.defaultDescription;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'og:site_name') {
            metas[i].content = SITE_NAME;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'og:url') {
            metas[i].content = `${window.location.origin}${window.location.pathname}`;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'og:image') {
            metas[i].content = `${window.location.origin}${seoData?.default?.image ?? '/assets/images/illustrations/dark/banner.svg'}`;
          }
        }
      }
    }
    const links = headTag.getElementsByTagName('meta');
    let hasOpenGraphTag = false;
    for(let i = 0, l = links.length; i < l; i++) {
      const attributes = links[i].attributes;
      for(let j = 0, le = attributes.length; j < le; j++) {
        if(attributes[j].name === 'property') {
          if(attributes[j].value === "og:type") {
            updateTags();
            hasOpenGraphTag = true;
            break;
          }
        }
      }
    }
    if(!hasOpenGraphTag) {
      addOpenGraphTags();
    }
  }

  // set twitter cards
  private setTwitterCards(headTag: HTMLHeadElement, seoData: any): void {
    const addTwitterCards = () => {
      // og title
      const title = this.doc.createElement('meta');
      title.setAttribute('property', 'twitter:title');
      title.setAttribute('content', seoData?.default?.title ?? this.defaultTitle);
      headTag.appendChild(title);
      // og description
      const description = this.doc.createElement('meta');
      description.setAttribute('property', 'twitter:description');
      description.setAttribute('content', seoData?.default?.description ?? this.defaultDescription);
      headTag.appendChild(description);
      // og description
      const image = this.doc.createElement('meta');
      image.setAttribute('property', 'twitter:image');
      image.setAttribute('content', `${window.location.origin}${seoData?.default?.image ?? '/assets/images/illustrations/dark/banner.svg'}`);
      headTag.appendChild(image);
      // og site
      const site = this.doc.createElement('meta');
      site.setAttribute('property', 'twitter:site');
      site.setAttribute('content', seoData?.default?.siteUserName ?? 'Koniat');
      headTag.appendChild(site);
      // og site
      const creator = this.doc.createElement('meta');
      creator.setAttribute('property', 'twitter:creator');
      creator.setAttribute('content', seoData?.default?.siteUserName ?? 'Sanjib Kumar Mandal');
      headTag.appendChild(creator);
    }

    const updateTwitterCards = () => {
      const metas = headTag.getElementsByTagName('meta');
      for(let i = 0, l = metas.length; i < l; i++) {
        const attributes = metas[i].attributes;
        for(let j = 0, le = attributes.length; j < le; j++) {
          if(attributes[j].name === 'property' && attributes[j].value === 'twitter:title') {
            metas[i].content = seoData?.default?.title ?? this.defaultTitle;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'twitter:description') {
            metas[i].content = seoData?.default?.description ?? this.defaultDescription;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'twitter:site') {
            metas[i].content = 'Koniat';
          } else if(attributes[j].name === 'property' && attributes[j].value === 'twitter:image') {
            metas[i].content = `${window.location.origin}${seoData?.default?.image ?? '/assets/images/illustrations/dark/banner.svg'}`;
          } else if(attributes[j].name === 'property' && attributes[j].value === 'twitter:creator') {
            metas[i].content = seoData?.default?.siteUserName ?? 'Sanjib Kumar Mandal';
          }
        }
      }
    }
    const links = headTag.getElementsByTagName('meta');
    let hasOpenGraphTag = false;
    for(let i = 0, l = links.length; i < l; i++) {
      const attributes = links[i].attributes;
      for(let j = 0, le = attributes.length; j < le; j++) {
        if(attributes[j].name === 'property') {
          if(attributes[j].value === "twitter:title") {
            updateTwitterCards();
            hasOpenGraphTag = true;
            break;
          }
        }
      }
    }
    if(!hasOpenGraphTag) {
      addTwitterCards();
    }
  }
}
