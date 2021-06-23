import { Component, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateParserFormatter } from 'src/app/shared/component/DateParserFormatter';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: DateParserFormatter},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  dateTimeString: string;
  @Input()
  inputDatetimeFormat = 'dd/MM/yyyy HH:mm:ss';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 15;
  @Input()
  secondStep = 30;
  @Input()
  seconds = true;

  @Input() date: NgbDateStruct;
  @Input() time: NgbTimeStruct;
  dateString: string;
  timeString: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  get value(): string {
    return this.dateTimeString;
  }

  @Input('value')
  set value(value: string) {
    this.dateTimeString = value;
  }

  @HostListener('input', ['$event.target.value', '$event.target.value'])
  input(event, value): void {
    this.dateTimeString = value;
    this.onChange(this.dateTimeString);
  }

  onChange(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: any): void {
    if (value) {
      const datetime = value.trim().split(' ');
      const date = datetime[0].split('/');
      const time = datetime[1].split(':');
      this.date = {
        day: date[0],
        month: date[1],
        year: date[2],
      };
      this.time = {
        hour: time[0],
        minute: time[1],
        second: this.seconds ? time[2] : 0,
      };
      this.getDateString();
      this.getTimeString();
    } else {
      this.dateString = '';
      this.timeString = '';
      this.dateTimeString = '';
    }
  }

  onDateChange(value, dp): void {
    if (value) {
      this.date = value;
      this.getDateString();
      this.onChange(this.dateTimeString);
    }
  }

  onTimeChange(value): void {
    if (value) {
      this.time = value;
      this.getTimeString();
      this.onChange(this.dateTimeString);
    }
  }

  getDateString(): void {
    this.dateString = this.pad(this.date.day) + '/' + this.pad(this.date.month) + '/' + this.date.year;
    if (this.dateString && this.timeString) {
      this.dateTimeString = this.dateString + ' ' + this.timeString;
    }
  }

  getTimeString(): void {
    this.timeString = this.pad(this.time.hour) + ':' + this.pad(this.time.minute) +
      (this.seconds ? ':' + this.pad(this.time.second) : '');
    if (this.dateString && this.timeString) {
      this.dateTimeString = this.dateString + ' ' + this.timeString;
    }
  }

  private pad(value): string {
    if (!value) {
      return '';
    }
    return value.toString().padStart(2, '0');
  }
}
