import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/shared/model/item';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  baseUrl: string;
  formGroup: FormGroup;
  items: Item[];
  cartHref: string;
  coupon: number;
  totalAmount: number;

  constructor(
    private configService: AppConfigService,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.buildForm();
    this.cartService.itemEvent.subscribe(e => {
      if (!e || e.length === 0) {
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
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  submit(): void {
    this.toast.showSuccess('Success');
  }
}
