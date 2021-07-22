import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/service/news.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { News } from 'src/app/shared/model/news';
import { UrlConstant } from 'src/app/shared/constants/url.class';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private titleService: Title,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getSlug();
  }

  private getSlug(): void {
    let slug = this.router.url;
    const arr = slug.trim().split('/');
    if (arr && arr.length > 2) {
      slug = '/' + arr[arr.length - 1].toLowerCase();
      this.newsService.getNewsBySlug(slug).subscribe(res => {
        this.news = res.data;
        this.titleService.setTitle(this.news.name);
      });
    } else {
      this.router.navigate([UrlConstant.PAGE_NOT_FOUND], {skipLocationChange: true});
    }
  }
}
