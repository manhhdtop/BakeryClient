import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from 'src/app/service/search.service';
import { News } from 'src/app/shared/model/news';
import { Product } from 'src/app/shared/model/product';
import { AppConfigService } from 'src/app/service/app-config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss', '../../../../assets/css/items.scss'],
})
export class SearchComponent implements OnInit {
  baseUrl: string;
  keyword: string;
  keywordParam: string;
  newsList: News[];
  products: Product[];
  totalPageNews: number;
  totalPageProduct: number;
  currentProduct: Product;
  private searchEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('addToCardModal') addToCardModal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: AppConfigService,
    private searchService: SearchService,
    private router: Router,
    private title: Title,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.totalPageNews = 0;
    this.totalPageProduct = 0;
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.searchEvent.subscribe(() => {
      this.setPageTitle();
      this.search();
    });
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.keyword = params.keyword ? params.keyword : '';
        this.keywordParam = params.keyword;
        this.searchEvent.emit();
      });
  }

  private setPageTitle(): void {
    this.translate.get('search.title', {keyword: this.keywordParam}).subscribe(s => {
      const webName = this.translate.instant('logo_text');
      this.title.setTitle(s + ' - ' + webName);
    });
  }

  private search(): void {
    if (!this.keyword || this.keyword.trim().length === 0) {
      return;
    }
    const params = {
      keyword: this.keyword,
    };
    this.searchService.search(params).subscribe(res => {
      this.keywordParam = this.keyword;
      this.setPageTitle();
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: {keyword: this.keyword},
          queryParamsHandling: 'merge',
        });
      if (res.errorCode === '200') {
        this.newsList = res.data.news.content;
        this.totalPageNews = res.data.news.totalPages;
        this.products = res.data.products.content;
        this.totalPageProduct = res.data.products.totalPages;
      }
      console.log(res);
    });
  }

  onSearch(event): void {
    event.preventDefault();
    this.search();
  }

  showAddToCartModal(product): void {
    this.currentProduct = product;
    this.addToCardModal.open();
  }
}
