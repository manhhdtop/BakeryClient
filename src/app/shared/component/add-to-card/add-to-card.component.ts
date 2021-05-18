import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.scss'],
})
export class AddToCardComponent implements OnInit {
  @Input() product: Product;
  @ViewChild('modal') modal;

  constructor() {
  }

  ngOnInit(): void {
  }

  save(): void {
    console.log(this.modal);
  }
}
