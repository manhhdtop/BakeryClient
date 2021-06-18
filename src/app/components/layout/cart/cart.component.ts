import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { CartService } from 'src/app/service/cart.service';
import { AppConfigService } from 'src/app/service/app-config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Item[];
  totalAmount: number;
  baseUrl: string;

  constructor(
    private configService: AppConfigService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.cartService.itemEvent.subscribe(e => {
      this.items = e;
    });
    this.cartService.getItems();
    this.getTotalAmount();
  }

  updateQuantity(itemId: number, value: number): void {
    const index = this.items.findIndex(e => e.product.id === itemId);
    this.items[index].quantity = value;
    this.getTotalAmount();
    this.cartService.updateItem(this.items[index]);
  }

  removeItem(event, id): void {
    event.preventDefault();
    this.cartService.removeItem(id);
    this.cartService.getItems();
    this.getTotalAmount();
  }

  getTotalAmount(): void {
    this.totalAmount = this.items.map(({quantity, product}) => product.price * quantity).reduce((a, b) => a + b, 0);
  }

  updateCart(): void {
    console.log(this.items);
  }
}
