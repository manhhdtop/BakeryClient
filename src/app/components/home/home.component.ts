import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { MenuCategory } from '../../shared/model/menu-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: MenuCategory[];

  constructor(
    private homeService: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.categories = this.homeService.getMenuCategories();
    console.log('(HomeComponent) categories: ', this.categories);
  }

}
