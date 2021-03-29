import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  formSearch: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  openSearch(): void {
    $('body').toggleClass('search__box__show__hide');
  }

  toggleCart(): void {
    $('.shopping__cart').toggleClass('shopping__cart__on');
    $('.body__overlay').toggleClass('is-visible');
  }
}
