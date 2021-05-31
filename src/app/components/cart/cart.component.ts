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
  totalAmount: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.itemEvent.subscribe(e => {
      this.items = e;
    });
    this.cartService.getItems();
    this.totalAmount = this.cartService.getTotalAmount();
  }

  updateQuantity(itemId: number, value: number): void {
    const index = this.items.findIndex(e => e.product.id === itemId);
    this.items[index].quantity = value;
  }

  removeItem(event, id): void {
    event.preventDefault();
    this.cartService.removeItem(id);
    this.totalAmount = this.cartService.getTotalAmount();
  }
}
