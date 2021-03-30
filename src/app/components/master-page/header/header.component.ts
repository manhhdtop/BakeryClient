import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../service/cart.service';
import { Item } from '../../../shared/model/item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  formSearch: FormGroup;
  fb: FormBuilder;
  searching: boolean;
  itemAmount: number;
  totalAmount: number;
  items: Item[];

  constructor(private modalService: NgbModal, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.searching = false;
    this.formSearch = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.items = this.cartService.getItems();
    this.itemAmount = this.items.length;
    this.totalAmount = this.cartService.getTotalAmount();
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('Closed with: ', result);
    }, (reason) => {
      console.log('Dismissed: ', reason);
    });
  }

  openSearch(): void {
    this.searching = !this.searching;
  }

  onSearch($event): void {
    $event.preventDefault();
  }

  viewCart(): void {
    console.log('View Cart');
  }

  checkout(): void {
    console.log('Checkout');
  }

  removeItem(id): void {
    this.cartService.removeItem(id);
    this.itemAmount = this.items.length;
    this.totalAmount = this.cartService.getTotalAmount();
  }
}
