import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-master-page',
  templateUrl: './admin-master-page.component.html',
  styleUrls: ['./admin-master-page.component.css'],
})
export class AdminMasterPageComponent implements OnInit {
  selectedMenu = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    console.log('url: ', this.activeRoute.firstChild.snapshot.url);
    this.translateTitle();
    this.router.events.subscribe((val) => {
      this.translateTitle();
    });
  }

  private translateTitle(): void {
    this.translate.get(this.activeRoute.firstChild.snapshot.data.page_title).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }
}
