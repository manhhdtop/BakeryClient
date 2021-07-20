import { Component, Input, OnChanges, OnInit, ViewChildren } from '@angular/core';
import { AppConfigService } from 'src/app/service/app-config.service';
import { News } from 'src/app/shared/model/news';

@Component({
  selector: 'app-slider-news',
  templateUrl: './slider-news.component.html',
  styleUrls: ['./slider-news.component.scss'],
})
export class SliderNewsComponent implements OnInit, OnChanges {
  @Input() newsList: News[];
  @Input() index: number;
  @ViewChildren('slider') slider;

  baseUrl: string;

  constructor(
    private configService: AppConfigService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
  }

  ngOnChanges(): void {
    if (!this.index || this.index < 0 || this.index >= this.newsList.length) {
      this.index = 0;
    }
  }

  previous(): void {
    let length = this.slider.first.nativeElement.offsetWidth;
    if (this.index < 4) {
      length = -length;
      this.index = this.newsList.length - 1;
    } else {
      this.index--;
      length = length / 4;
    }
    this.slider.first.nativeElement.scrollTo({
      left: (this.slider.first.nativeElement.scrollLeft - length),
      behavior: 'smooth',
    });
  }

  next(): void {
    let length = this.slider.first.nativeElement.offsetWidth;
    if (this.index >= this.newsList.length - 4) {
      length = -length;
      this.index = 0;
    } else {
      this.index++;
      length = length / 4;
    }
    this.slider.first.nativeElement.scrollTo({
      left: (this.slider.first.nativeElement.scrollLeft + length),
      behavior: 'smooth',
    });
  }

  changeImage(i: number): void {
    if (i !== undefined && i !== null && i >= 0 && i < this.newsList.length) {
      this.index = i;
      // document.getElementById(`slide-${ i }`).scrollIntoView();
    }
  }
}
