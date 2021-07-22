import { Component, EventEmitter, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { News } from 'src/app/shared/model/news';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit {
  newsList: News[];
  baseUrl: string;
  page: number;
  size: number;
  keyword: string;
  private searchEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: AppConfigService,
    private newsService: NewsService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.searchEvent.subscribe(() => {
      this.search();
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params.keyword ? params.keyword : '';
      this.searchEvent.emit();
    });
  }

  private search(): void {
    const params = {
      name: this.keyword,
    };
    this.newsService.getNews(params).subscribe(res => {
      this.newsList = res.data.content;
    });
  }
}
