import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

class ResizedEvent {
  public newRect: DOMRectReadOnly;
  public oldRect?: DOMRectReadOnly;
  public isFirst: boolean;
  public constructor(
    newRect: DOMRectReadOnly,
    oldRect: DOMRectReadOnly | undefined
  ) {
    this.newRect = newRect;
    this.oldRect = oldRect;
    this.isFirst = oldRect == null;
  }
}

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[resized]',
})
export class ResizedDirective implements OnInit, OnDestroy {
  private observer: ResizeObserver = new ResizeObserver((entries) =>
    this.zone.run(() => this.observe(entries))
  );
  private oldRect!: DOMRectReadOnly;

  @Output() public readonly resized = new EventEmitter<DOMRectReadOnly>();

  constructor(
    private readonly element: ElementRef,
    private readonly zone: NgZone
  ) {}

  ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  private observe(entries: Array<ResizeObserverEntry>): void {
    const domSize = entries[0];
    const resizedEvent = new ResizedEvent(domSize.contentRect, this.oldRect);
    this.oldRect = domSize.contentRect;
    this.resized.emit(resizedEvent?.newRect);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
