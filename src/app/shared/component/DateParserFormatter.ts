import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string, format?: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.pad(date.day) + this.DELIMITER + this.pad(date.month) + this.DELIMITER + date.year : '';
  }

  private pad(value): string {
    return value.toString().padStart(2, '0');
  }
}
