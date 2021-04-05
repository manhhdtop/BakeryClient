import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  selectedMenu: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  isActiveNav(href: string): boolean {
    return this.selectedMenu === href;
  }
}
