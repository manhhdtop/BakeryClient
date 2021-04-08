import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../../../service/admin.service';
import { Constant } from '../../../../shared/constants/constant.class';
import { Utils } from '../../../../shared/util/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  lang: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private adminService: AdminService,
    private modal: NgbModal,
    private router: Router,
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
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }

  toggleSidebar(): void {
    this.adminService.toggleSidebar();
  }

  logout(modal): void {
    localStorage.removeItem(Constant.TOKEN);
    localStorage.removeItem(Constant.USER_INFO);
    this.router.navigate(['/admin/login']);
    modal.dismiss();
  }

  open(content): void {
    this.modal.open(content);
  }
}
