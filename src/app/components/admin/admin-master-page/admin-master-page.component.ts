import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { Utils } from '../../../shared/util/utils';

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
    this.translateTitle();
    this.router.events.subscribe((val) => {
      this.translateTitle();
    });
  }

  private translateTitle(): void {
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    const scrollDistance = $(document).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  }

  scrollTop(event): void {
    event.preventDefault();
    window.scrollTo(0, 0);
  }
}
