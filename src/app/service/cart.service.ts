import { EventEmitter, Injectable } from '@angular/core';
import { Item } from '../shared/model/item';
import { Product } from '../shared/model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Item[];
  private ITEMS_KEY = 'cart';
  itemEvent: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  constructor() {
    const json = localStorage.getItem(this.ITEMS_KEY);
    if (json) {
      this.items = JSON.parse(json);
    } else {
      this.items = [];
    }
  }

  addToCart(product: Product, quantity?: number): void {
    if (!quantity) {
      quantity = 1;
    }
    const item = this.items.find(value => value.product.id === product.id);
    if (item) {
      item.product = product;
      item.quantity = item.quantity + quantity;
      item.price = item.quantity * product.price;
    } else {
      this.items.push({
        product,
        quantity,
        price: product.price * quantity,
      });
    }
    localStorage.setItem(this.ITEMS_KEY, JSON.stringify(this.items));
    this.getItems();
  }

  getItems(): void {
    const items = this.items.map(x => Object.assign({}, x));
    this.itemEvent.emit(items);
  }

  clearCart(): void {
    this.items = [];
    this.getItems();
  }

  removeItem(itemId): void {
    const index: number = this.items.findIndex(value => value.product.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.getItems();
  }

  getTotalAmount(): number {
    let sum = 0;
    for (const item of this.items) {
      sum += item.price;
    }
    return sum;
  }
}
