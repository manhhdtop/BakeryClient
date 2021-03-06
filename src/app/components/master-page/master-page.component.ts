import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../service/toast.service';
import { Utils } from '../../shared/util/utils';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
})
export class MasterPageComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private toast: ToastService,
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
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }
}
