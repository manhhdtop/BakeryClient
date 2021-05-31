import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from 'src/app/service/app-config.service';
import { CartService } from 'src/app/service/cart.service';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadResponse } from 'src/app/shared/model/upload-response';

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
  private error: string;
  private success: string;

  constructor(
    private configService: AppConfigService,
    private cartService: CartService,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.quantity = 1;
    this.translate.get('add_to_cart.error').subscribe(e => {
      this.error = e;
      this.success = this.translate.instant('add_to_cart.success');
    });
  }

  ngOnChanges(): void {
    this.changeImage(0);
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
      this.toast.showDanger(this.error);
      return;
    }
    this.cartService.addToCart(this.product, this.quantity);
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
}
