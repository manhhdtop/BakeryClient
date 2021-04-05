import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  lang: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
  }

  changeLanguage(event, language): void {
    event.preventDefault();
    this.translate.use(language);
    this.lang = language;
    this.translateTitle();
    localStorage.setItem('language', language);
  }

  private translateTitle(): void {
    this.translate.get(this.activeRoute.firstChild.snapshot.data.page_title).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }
}
