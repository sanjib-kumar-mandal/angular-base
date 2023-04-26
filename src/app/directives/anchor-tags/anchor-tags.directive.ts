import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[anchorTags]',
})
export class AnchorTagsDirective implements AfterViewInit {
  private readonly httpRegex: RegExp = new RegExp(
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/
  );

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.element.nativeElement.tagName === 'A') {
      this.setDefaultOptions(this.element.nativeElement);
    } else {
      this.validateChilds(this.element.nativeElement);
    }
  }

  private validateChilds(tag: HTMLElement) {
    const allChilds = tag.children;
    for (let i = 0, l = allChilds.length; i < l; i++) {
      if (allChilds[i].tagName === 'A') {
        this.setDefaultOptions(allChilds[i] as HTMLAnchorElement);
      }
    }
  }

  private setDefaultOptions(tag: HTMLAnchorElement): void {
    const isValidUrl = this.httpRegex.test(tag.href ?? '');
    if (tag.href === '#') {
      tag.href = 'javascript:void(0)';
    }
    if (isValidUrl && !tag.hasAttribute('referrerpolicy')) {
      tag.setAttribute('referrerpolicy', 'origin-when-cross-origin');
    }

    if (isValidUrl && !tag.hasAttribute('target')) {
      tag.setAttribute('target', '_blank');
    }

    if (isValidUrl && !tag.hasAttribute('rel')) {
      tag.setAttribute('rel', 'external');
    }

    if (isValidUrl && !tag.hasAttribute('type')) {
      tag.setAttribute('type', 'text/html');
    }

    if (isValidUrl && !tag.hasAttribute('hreflang')) {
      tag.setAttribute('hreflang', 'en');
    }
  }
}
