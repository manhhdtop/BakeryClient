import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class SidebarComponent implements OnInit {

  selectedMenu: string;
  width: number = window.innerWidth;
  height: number = window.innerHeight;

  constructor(
    private activeRoute: ActivatedRoute,
    public adminService: AdminService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    if (this.width <= 768) {
      this.adminService.sidebarToggled = true;
    }
  }

  isActiveNav(href: string): boolean {
    return this.selectedMenu === href;
  }

  toggleSidebar(): void {
    this.adminService.toggleSidebar();
  }

  onWindowResize(event): void {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    if (this.width < 480 && !this.adminService.sidebarToggled) {
      this.adminService.sidebarToggled = true;
      return;
    }
    if (this.width <= 768) {
      this.adminService.sidebarToggled = true;
      return;
    }
    this.adminService.sidebarToggled = false;
  }
}
