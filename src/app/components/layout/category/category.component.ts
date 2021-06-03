import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/shared/model/category';
import { Product } from 'src/app/shared/model/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: Category;
  product: Product[];
  slug: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.getSlug();

  }

  private getSlug(): void {
    let slug = this.router.url;
    console.log('url: ', slug);
    const arr = slug.trim().split('/');
    if (arr && arr.length > 2) {
      slug = '/' + arr[arr.length - 1].toLowerCase();
      this.categoryService.getCategoryBySlug(slug).subscribe(res => {
        this.category = res.data;
      }, error => {
        this.translateService.get('menu.category.href').subscribe(e => {
          this.router.navigate([e]);
        });
      });
    } else {
      this.category = undefined;
    }
  }

}
