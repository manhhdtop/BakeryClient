import { Injectable } from '@angular/core';
import { MenuCategory } from '../shared/model/menu-category';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private categories: MenuCategory[];

  constructor() {
  }

  setMenuCategories(categories): void {
    this.categories = categories;
  }

  getMenuCategories(): MenuCategory[] {
    return this.categories;
  }
}
