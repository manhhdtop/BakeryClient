import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.searching = false;
    this.itemAmount = 2;
    this.formSearch = this.fb.group({
      keyword: new FormControl(),
    });
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
    console.log($event);
  }

  viewCart(): void {
    console.log('View Cart');
  }

  checkout(): void {
    console.log('Checkout');
  }
}
