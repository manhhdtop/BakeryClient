import {Pipe, PipeTransform} from '@angular/core';
import {DateFormatPipe} from './format-date.pipe';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'countDate',
})
export class CountDatePipe implements PipeTransform {
  constructor(
    private dateFormat: DateFormatPipe,
    private translate: TranslateService
  ) {
  }

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    let hour = '';
    let minute = '';
    let ago = '';
    this.translate.get('time.hour').subscribe(s => {
      hour = s;
      minute = this.translate.instant('time.minute');
      ago = this.translate.instant('time.ago');
    });
    const now = Math.floor(new Date().getTime() / 1000);
    let timestamp = Math.floor(value / 1000);
    timestamp = now - timestamp;
    if (timestamp < 120) {
      return 1 + ' ' + minute + ' ' + ago;
    }
    timestamp = Math.floor(timestamp / 60);
    if (timestamp < 60) {
      return timestamp + ' ' + minute + ' ' + ago;
    }
    timestamp = Math.floor(timestamp / 60);
    if (timestamp < 24) {
      return timestamp + ' ' + hour + ' ' + ago;
    }
    return this.dateFormat.transform(value, 'dd/MM/yyyy HH:mm:ss');
  }
}
