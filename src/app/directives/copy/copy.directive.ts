import { Directive, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, switchMap } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[copy]',
})
export class CopyDirective implements OnInit {
  @Input() copy!: string;

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'click')
        .pipe(
          switchMap(() => navigator.clipboard.writeText(this.copy)),
          untilDestroyed(this)
        )
        .subscribe(() => {
          console.log('Copied!');
        });
    });
  }
}
