import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../shared/util/utils';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
})
export class MasterPageComponent implements OnInit {

  pageName: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
  ) {
    router.events.subscribe((val) => {
      this.translateTitle();
    });
  }

  ngOnInit(): void {
    this.translateTitle();
  }

  private translateTitle(): void {
    this.translate.get(this.activeRoute.firstChild.snapshot.data.page_title).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }
}
