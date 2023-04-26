import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'naturalType',
})
export class NaturalTypePipe implements PipeTransform {
  private typed: string = '';
  private target: string = '';
  private currentIndex: number = -1;
  private timeoutHandle: any = -1;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  transform(value: string, minTypingSpeed: number = 30): any {
    if (this.target !== value) {
      clearTimeout(this.timeoutHandle);
      this.typed = '';
      this.currentIndex = -1;
      this.target = value;
      this.typeNextCharecter(minTypingSpeed);
    }
    return this.typed;
  }

  private typeNextCharecter(minTypingSpeed: number) {
    this.currentIndex++;
    this.typed = this.target.substr(0, this.currentIndex);
    this.changeDetector.markForCheck();
    if (this.typed !== this.target) {
      const time = Math.round(Math.random() * 70) + minTypingSpeed;
      this.timeoutHandle = setTimeout(() => {
        this.zone.run(() => this.typeNextCharecter(minTypingSpeed));
      }, time);
    }
  }
}
