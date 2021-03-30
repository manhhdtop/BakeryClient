import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/model/item';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Item[];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  updateQuantity(itemId: number, value: number): void {
    const index = this.items.findIndex(e => e.id === itemId);
    this.items[index].quantity = value;
    console.log('items: ', this.cartService.getItems());
  }
}
