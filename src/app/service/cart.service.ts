import { Injectable } from '@angular/core';
import { Item } from '../shared/model/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[];

  constructor() {
    this.items = [];
    this.items.push({
      id: 1,
      name: 'BO&Play Wireless Speaker',
      image: 'assets/image/product/big-img/1.jpg',
      quantity: 2,
      price: 105,
    });
    this.items.push({
      id: 2,
      name: 'Brone Candle',
      image: 'assets/image/product/big-img/1.jpg',
      quantity: 1,
      price: 25,
    });
    this.items.push({
      id: 3,
      name: 'Brone Candle 3',
      image: 'assets/image/product/big-img/1.jpg',
      quantity: 13,
      price: 25,
    });
    this.items.push({
      id: 4,
      name: 'Brone Candle 4 ',
      image: 'assets/image/product/big-img/1.jpg',
      quantity: 11,
      price: 25,
    });
  }

  addToCart(product: Item): void {
    const item = this.items.find(value => value.id === product.id);
    if (item) {
      item.quantity = item.quantity + product.quantity;
    } else {
      this.items.push(product);
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
    const index: number = this.items.findIndex(value => value.id === itemId);
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
