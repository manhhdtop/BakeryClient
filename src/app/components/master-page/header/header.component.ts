import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../service/cart.service';
import { CategoryService } from '../../../service/category.service';
import { ToastService } from '../../../service/toast.service';
import { Item } from '../../../shared/model/item';
import { Utils } from '../../../shared/util/utils';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { OptionType } from 'src/app/shared/model/option-type';
import { Option } from 'src/app/shared/model/option';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild(ConfirmComponent) confirmModal;

  formSearch: FormGroup;
  fb: FormBuilder;
  searching: boolean;
  itemAmount: number;
  totalAmount: number;
  lang: string;
  items: Item[];
  baseUrl: string;
  deleteTitle: string;
  deleteContent: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private configService: AppConfigService,
    private cartService: CartService,
    private categoryService: CategoryService,
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
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.cartService.itemEvent.subscribe(e => {
      this.items = e;
      this.itemAmount = this.items.length;
      this.totalAmount = this.cartService.getTotalAmount();
    });
    this.cartService.getItems();
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

  removeItem(event, item): void {
    event.preventDefault();
    this.translate.get('cart.delete_product_title').subscribe(e => {
      this.deleteTitle = e;
      this.deleteContent = this.translate.instant('cart.delete_product_content', {name: item.product.name});
    });
    this.confirmModal.open().then((result) => {
      if (result === this.confirmModal.ok) {
        this.cartService.removeItem(item.id);
      }
    }, () => {
    });
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

  getOptionType(item: Item, entry): OptionType {
    return item.product.optionTypes.find(e => {
      return e.id === entry[0];
    });
  }

  getOption(item: Item, entry): Option {
    return this.getOptionType(item, entry).options.find(e => {
      return e.id === entry[1];
    });
  }
}
