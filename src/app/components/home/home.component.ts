import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ToastService } from '../../service/toast.service';
import { MenuCategory } from '../../shared/model/menu-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: MenuCategory[];

  constructor(
    private categoryService: CategoryService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.getMenuCategory();
  }

  private getMenuCategory(): void {
    this.categoryService.getMenuCategories().subscribe(res => {
      this.categories = [...res.data];
    }, error => {
      this.toast.showDanger(error.errorDescription);
    });
  }

}
