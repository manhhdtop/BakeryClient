import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[numberInput]',
  providers: [
    NgModel,
  ],
})
export class NumberInputDirective implements OnInit, ControlValueAccessor, OnDestroy {
  locale = 'en';
  decimalMarker = '.';
  // tslint:disable-next-line:variable-name
  private _value: string;

  constructor(private element: ElementRef<HTMLInputElement>, private ngModel: NgModel) {
  }

  ngOnInit(): void {
    /* Listening to the value of ngModel */
    this.ngModel.valueChanges.subscribe((value) => {
      this._onChange(value);
    });

    /* Inform ng model for any news change happened */
    $(this.element.nativeElement).bind('customEvent', (newValue) => {
      this.ngModel.update.emit(newValue);
    });
  }

  get value(): string {
    return this._value;
  }

  @Input('value')
  set value(value: string) {
    this._value = value;
  }

  @HostListener('keypress', ['$event'])
  keypress(event): boolean {
    const k = event.charCode;
    return (k === 46 || (k >= 48 && k <= 57));
  }

  _onChange(value: any): void {
    this.value = value;
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(): void {
  }

  isLastCharacterDecimalSeparator(value: any): boolean {
    if (value === undefined || value === null || value === '') {
      return false;
    }
    return isNaN(value[value.length - 1]);
  }

  ngOnDestroy(): void {
  }
}
