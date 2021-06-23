import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from 'src/app/service/app-config.service';
import { CartService } from 'src/app/service/cart.service';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { OptionType } from 'src/app/shared/model/option-type';

@Component({
  selector: 'app-add-to-card',
  templateUrl: './add-to-card.component.html',
  styleUrls: ['./add-to-card.component.scss'],
})
export class AddToCardComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @ViewChild('modal') modal;

  imageVisible: string;
  imageVisibleIndex: number;
  baseUrl: string;
  quantity: number;
  price: number;
  optionTypes: OptionType[];
  private quantityError: string;
  private optionError: string;
  private success: string;
  private options = [];

  constructor(
    private configService: AppConfigService,
    private cartService: CartService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.translate.get('add_to_cart.quantity_error').subscribe(e => {
      this.quantityError = e;
      this.optionError = this.translate.instant('add_to_cart.option_error');
      this.success = this.translate.instant('add_to_cart.success');
    });
  }

  ngOnChanges(): void {
    this.changeImage(0);
    this.optionTypes = this.product?.optionTypes;
    this.options.length = 0;
    this.price = this.product?.price;
    this.quantity = 1;

    while (this.options.length > 0) {
      this.options.pop();
    }
  }

  open(): void {
    this.modalService.open(this.modal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
      backdrop: false,
      keyboard: false,
    });
  }

  changeImage(index): void {
    if (this.product?.images && this.product?.images.length > 0) {
      this.imageVisible = this.baseUrl + this.product.images[index].uri;
      this.imageVisibleIndex = 1;
    } else {
      this.imageVisible = null;
      this.imageVisibleIndex = null;
    }
  }

  save(modal): void {
    if (this.quantity <= 0) {
      this.toast.showDanger(this.quantityError);
      return;
    }
    if (this.optionTypes && this.optionTypes.length > 0) {
      const optionSize = this.options.length;
      if (!optionSize || optionSize <= 0 || optionSize < this.optionTypes.length) {
        this.toast.showDanger(this.optionError);
        return;
      }
    }

    this.cartService.addToCart(this.product, this.quantity, Object.assign([], this.options));
    this.toast.showSuccess(this.success);
    setTimeout((handler) => {
      modal.dismiss();
    }, 1000);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    this.quantity--;
  }

  chooseOption(optionTypeId, optionId): void {
    const option = this.optionTypes.find(e => {
      return e.id === optionTypeId;
    })?.options.find(e => {
      return e.id === optionId;
    });
    if (option) {
      this.price = option.price ? option.price : this.product.price;
      if (!this.options || this.options.length === 0) {
        this.options.push([optionTypeId, optionId]);
      } else {
        const index = this.options.findIndex(e => {
          return e[0] === optionTypeId;
        });
        if (index !== undefined && index !== null && index >= 0) {
          this.options[index] = [optionTypeId, optionId];
        } else {
          this.options.push([optionTypeId, optionId]);
        }
      }
    }
  }
}
