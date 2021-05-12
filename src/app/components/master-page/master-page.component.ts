import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from '../../service/category.service';
import { HomeService } from '../../service/home.service';
import { ToastService } from '../../service/toast.service';
import { MenuCategory } from '../../shared/model/menu-category';
import { Utils } from '../../shared/util/utils';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
})
export class MasterPageComponent implements OnInit {
  categories: MenuCategory[];

  constructor(
    private activeRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private homeService: HomeService,
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
    this.getMenuCategory();
  }

  private translateTitle(): void {
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }

  private getMenuCategory(): void {
    this.categoryService.getMenuCategories().subscribe(res => {
      this.categories = [...res.data];
      this.homeService.setMenuCategories(this.categories);
    }, error => {
      this.toast.showDanger(error.errorDescription);
    });
  }
}
