import { EventEmitter, Injectable } from '@angular/core';
import { Item } from '../shared/model/item';
import { Product } from '../shared/model/product';
import { v4 as uuidv4 } from 'uuid';

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

  addToCart(product: Product, quantity?: number, options?): void {
    if (!quantity) {
      quantity = 1;
    }
    let item = this.items.find(value => {
        return value.product.id === product.id && JSON.stringify(value.options) === JSON.stringify(options);
    });
    if (item) {
      item.product = product;
      item.quantity = item.quantity + quantity;
      item.price = item.quantity * product.price;
      item.options = options;
    } else {
      item = {
        id: uuidv4(),
        product,
        quantity,
        price: product.price * quantity,
        options,
      };
      this.items.push(item);
    }
    this.saveCart();
    this.getItems();
  }

  getItems(): void {
    const items = this.items.map(x => Object.assign({}, x));
    this.itemEvent.emit(items);
  }

  clearCart(): void {
    this.items = [];
    this.saveCart();
    this.getItems();
  }

  removeItem(id): void {
    const index: number = this.items.findIndex(value => value.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCart();
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

  private saveCart(): void {
    localStorage.setItem(this.ITEMS_KEY, JSON.stringify(this.items));
  }

  updateItem(item: Item): void {
    const index = this.items.findIndex(e => e.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.saveCart();
    }
  }
}
