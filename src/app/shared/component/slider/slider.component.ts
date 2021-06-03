import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChildren } from '@angular/core';
import { UploadResponse } from 'src/app/shared/model/upload-response';
import { ToastService } from 'src/app/service/toast.service';
import { AppConfigService } from 'src/app/service/app-config.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() images: UploadResponse[];
  @Input() index: number;
  @Output() changeEvent: EventEmitter<number> = new EventEmitter<number>();
  @ViewChildren('slider') slider;

  baseUrl: string;

  constructor(
    private configService: AppConfigService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
  }

  ngOnChanges(): void {
    if (!this.index || this.index < 0 || this.index >= this.images.length) {
      this.index = 0;
    }
  }

  previous(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this.changeImage(this.index);
  }

  next(): void {
    this.index++;
    if (this.index === this.images.length) {
      this.index = 0;
    }
    this.changeImage(this.index);
  }

  changeImage(i: number): void {
    if (i !== undefined && i !== null && i >= 0 && i < this.images.length) {
      this.index = i;
      document.getElementById(`slide-${ i }`).scrollIntoView();
      this.changeEvent.emit(this.index);
    }
  }
}
