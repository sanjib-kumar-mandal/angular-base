import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { fromEvent, switchMap } from 'rxjs';

@Directive({
  selector: '[appCopy]'
})
export class CopyDirective {
  
  @Input() copy!: string;

  constructor(
    private host: ElementRef<HTMLElement>,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'click').pipe(
        switchMap(() => navigator.clipboard.writeText(this.copy))).subscribe(() => {
          console.log("Copied!")
      })
    })
  }

}
