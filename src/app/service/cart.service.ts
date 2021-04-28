import { Injectable } from '@angular/core';
import { Item } from '../shared/model/item';
import { Product } from '../shared/model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[];

  constructor() {
    this.items = [];
  }

  addToCart(product: Product, quantity?: number): void {
    if (!quantity) {
      quantity = 1;
    }
    const item = this.items.find(value => value.product.id === product.id);
    if (item) {
      item.quantity = item.quantity + quantity;
    } else {
      this.items.push({
        product,
        quantity,
        price: product.price * quantity,
      });
    }
  }

  getItems(): any[] {
    return this.items.map(x => Object.assign({}, x));
  }

  clearCart(): any[] {
    this.items = [];
    return this.getItems();
  }

  removeItem(itemId): any[] {
    const index: number = this.items.findIndex(value => value.product.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return this.getItems();
  }

  getTotalAmount(): number {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price;
    }
    return sum;
  }
}
