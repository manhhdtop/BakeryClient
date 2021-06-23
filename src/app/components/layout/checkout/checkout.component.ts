import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/shared/model/item';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ToastService } from 'src/app/service/toast.service';
import { Voucher } from 'src/app/shared/model/Voucher';
import { VoucherService } from 'src/app/service/voucher.service';
import { CatalogService } from 'src/app/service/catalog.service';
import { Catalog } from 'src/app/shared/model/Catalog';
import { Constant } from 'src/app/shared/constants/constant.class';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private VOUCHER_KEY = 'voucher';
  baseUrl: string;
  formGroup: FormGroup;
  items: Item[];
  cartHref: string;
  coupon: number;
  totalAmount: number;
  voucher: Voucher;
  voucherCodeError: string;
  provinces: Catalog[];
  districts: Catalog[];
  submitted: boolean;
  private emailPattern: string;
  orderSuccess: boolean;

  constructor(
    private configService: AppConfigService,
    private cartService: CartService,
    private catalogService: CatalogService,
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
    private voucherService: VoucherService,
  ) {
  }

  ngOnInit(): void {
    this.submitted = false;
    this.orderSuccess = false;
    this.emailPattern = Constant.EMAIL_PATTERN;
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.buildForm();
    this.cartService.itemEvent.subscribe(e => {
      if (!this.orderSuccess && (!e || e.length === 0)) {
        // tslint:disable-next-line:no-shadowed-variable
        this.translate.get('menu.product.href').subscribe(e => {
          this.router.navigate([e]);
        });
      }
      this.items = e;
      this.cartHref = this.translate.instant('menu.cart.href');
    });
    this.cartService.getItems();
    this.coupon = 20000;
    this.totalAmount = this.cartService.getTotalAmount();
    const coupon = localStorage.getItem(this.VOUCHER_KEY);
    if (coupon) {
      this.formGroup.controls.voucherCode.setValue(coupon);
      this.applyVoucher();
    }
    this.getProvinces();
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      customerPhone: ['', Validators.required],
      provinceId: ['', Validators.required],
      districtId: ['', Validators.required],
      address: ['', Validators.required],
      voucherCode: [''],
    });
  }

  submit(): void {
    this.submitted = true;
    const data = this.formGroup.value;
    if (!this.voucher) {
      data.voucherCode = '';
    }
    data.products = this.items.map(item => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });
    this.invoiceService.createInvoice(data).subscribe(res => {
      if (res.errorCode === '200') {
        this.toast.showSuccess(res.errorDescription);
        this.orderSuccess = true;
        this.cartService.clearCart();
        localStorage.removeItem(this.VOUCHER_KEY);
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    }, error => {
      this.translate.get('api_error').subscribe(e => {
        this.toast.showDanger(error?.error.message ? error.error.message : e);
      });
    });
  }

  applyVoucher(): void {
    if (!this.formGroup.controls.voucherCode.value || this.formGroup.controls.voucherCode.value.trim() === '') {
      this.voucherCodeError = 'checkout.voucher_code.not_blank';
      return;
    }
    this.voucherService.checkCode(this.formGroup.controls.voucherCode.value.trim()).subscribe(res => {
      if (res.errorCode === '200') {
        const voucher = res.data;
        if (voucher.quantity === 0) {
          this.voucherCodeError = 'checkout.voucher_code.not_exist';
          return;
        }
        if (voucher.minAmount) {
          if (voucher.minAmount > this.totalAmount) {
            this.voucherCodeError = 'checkout.voucher_code.not_enough_condition';
            return;
          }
        }
        if (voucher.maxAmount) {
          if (voucher.maxAmount < this.totalAmount) {
            this.voucherCodeError = 'checkout.voucher_code.not_enough_condition';
            return;
          }
        }
        this.voucherCodeError = undefined;
        this.voucher = res.data;
        localStorage.setItem(this.VOUCHER_KEY, this.formGroup.controls.voucherCode.value.trim());
      } else {
        this.voucherCodeError = res.errorDescription;
        this.toast.showDanger(res.errorDescription);
      }
    }, error => {
      this.voucherCodeError = error.error.message ? error.error.message : 'api_error';
    });
  }

  removeVoucher(): void {
    const coupon = localStorage.getItem(this.VOUCHER_KEY);
    if (coupon) {
      localStorage.removeItem(this.VOUCHER_KEY);
      this.formGroup.controls.voucherCode.setValue('');
      this.voucher = undefined;
    }
  }

  provinceSelectedChange(event): void {
    this.getDistricts(event.target.value);
  }

  private getProvinces(): void {
    this.catalogService.getProvinces().subscribe(res => {
      this.provinces = res.data;
    });
  }

  private getDistricts(provinceId): void {
    if (!provinceId || provinceId === -1) {
      this.districts = undefined;
      return;
    }
    this.catalogService.getDistricts(provinceId).subscribe(res => {
      this.districts = res.data;
    });
  }
}
