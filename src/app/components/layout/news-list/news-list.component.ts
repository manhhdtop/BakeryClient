import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { News } from 'src/app/shared/model/news';
import { AppConfigService } from 'src/app/service/app-config.service';

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

  constructor(
    private configService: AppConfigService,
    private newsService: NewsService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.search();
  }

  private search(): void {
    const params = {};
    this.newsService.getNews(params).subscribe(res => {
      this.newsList = res.data.content;
    });
  }
}
