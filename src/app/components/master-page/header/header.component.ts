import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../service/cart.service';
import { ToastService } from '../../../service/toast.service';
import { Item } from '../../../shared/model/item';
import { MenuCategory } from '../../../shared/model/menu-category';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  formSearch: FormGroup;
  fb: FormBuilder;
  searching: boolean;
  itemAmount: number;
  totalAmount: number;
  lang: string;
  items: Item[];
  @Input() categories: MenuCategory[];

  constructor(
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private modalService: NgbModal,
    private titleService: Title,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.searching = false;
    this.formSearch = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.items = this.cartService.getItems();
    this.itemAmount = this.items.length;
    this.totalAmount = this.cartService.getTotalAmount();
    this.lang = this.translate.currentLang;
  }

  open(content): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'cart',
    });
  }

  toggleSearch(): void {
    console.log('searching: ', !this.searching);
    this.searching = !this.searching;
  }

  onSearch($event): void {
    $event.preventDefault();
  }

  checkout(): void {
    console.log('Checkout');
  }

  removeItem(event, id): void {
    event.preventDefault();
    this.items = this.cartService.removeItem(id);
    this.itemAmount = this.items.length;
    this.totalAmount = this.cartService.getTotalAmount();
  }

  changeLanguage(event, language): void {
    event.preventDefault();
    this.translate.use(language);
    this.lang = language;
    this.translateTitle();
    localStorage.setItem('language', language);
  }

  private translateTitle(): void {
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.titleService.setTitle(e);
    });
  }
}
