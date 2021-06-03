import { formatNumber } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[numberFormatInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormatInputDirective),
      multi: true,
    },
  ],
})
export class NumberFormatInputDirective implements ControlValueAccessor, OnDestroy, AfterViewInit {
  locale = 'en';
  decimalMarker = '.';
  // tslint:disable-next-line:variable-name
  private _value: string;
  private regExp = new RegExp(`[^\\d\\${this.decimalMarker}-]`, 'g');

  constructor(private element: ElementRef<HTMLInputElement>) {
  }

  ngAfterViewInit(): void {
    this.formatValue(this._value + '');
  }

  get value(): string {
    return this._value;
  }

  @Input('value')
  set value(value: string) {
    this._value = (value + '').replace(this.regExp, '');
    this.formatValue(value);
  }

  @HostListener('input', ['$event.target.value', '$event.target.value'])
  input(event, value): void {
    const [integer, decimal] = value.replace(this.regExp, '').split(this.decimalMarker);

    this._value = decimal ? integer.concat('.', decimal) : integer;

    // if (this.isLastCharacterDecimalSeparator(value)) {
    //   this._value = value;
    // }

    this._onChange(this._value);
  }

  @HostListener('blur')
  _onBlur(): void {
    this.formatValue(this._value);
  }

  @HostListener('focus')
  onFocus(): void {
    this.unFormatValue();
  }

  _onChange(value: any): void {
  }

  writeValue(value: any): void {
    this._value = value;
    this.formatValue(this._value);
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


  private formatValue(value: string | null): void {
    if (value === undefined || value === null || value === '') {
      this.element.nativeElement.value = '';
      return;
    }

    if (this.isLastCharacterDecimalSeparator(value)) {
      this.element.nativeElement.value = value;
      return;
    }

    const [thousandSeparator, decimalMarker] = formatNumber(1000.99, this.locale).replace(/\d/g, '');
    this.decimalMarker = decimalMarker;
    const [integer, decimal] = value.split('.');
    this.element.nativeElement.value = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    if (decimal) {
      this.element.nativeElement.value = this.element.nativeElement.value.concat(decimalMarker, decimal);
    }
  }

  private unFormatValue(): void {
    const value = this.element.nativeElement.value;
    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value.replace(regExp, '').split(this.decimalMarker);

    this._value = decimal ? integer.concat('.', decimal) : integer;

    if (value) {
      this.element.nativeElement.value = this._value;
    } else {
      this.element.nativeElement.value = '';
    }
  }

  ngOnDestroy(): void {
  }
}
