import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from 'src/app/service/product.service';
import {Product} from 'src/app/shared/model/product';
import {ToastService} from 'src/app/service/toast.service';
import {AppConfigService} from 'src/app/service/app-config.service';
import {OptionType} from 'src/app/shared/model/option-type';
import {CartService} from 'src/app/service/cart.service';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductRate} from '../../../shared/model/product-rate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  slug: string;
  baseUrl: string;
  imageIndex: number;
  price: number;
  quantity: number;
  loaded: boolean;
  optionTypes: OptionType[];
  rates: ProductRate[];
  productRate: number;
  rate: number;
  private options = [];
  private quantityError: string;
  private optionError: string;
  private success: string;
  rateForm: FormGroup;
  submitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private configService: AppConfigService,
    private cartService: CartService,
    private fb: FormBuilder,
    private ratingConfig: NgbRatingConfig,
    private productService: ProductService,
    private router: Router,
    private titleService: Title,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
    ratingConfig.max = 5;
    ratingConfig.readonly = true;
  }

  ngOnInit(): void {
    this.productRate = 0;
    this.rate = 0;
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.slug = this.route.snapshot.params.slug;
    this.imageIndex = 0;
    this.quantity = 1;
    this.translate.get('add_to_cart.quantity_error').subscribe(e => {
      this.quantityError = e;
      this.optionError = this.translate.instant('add_to_cart.option_error');
      this.success = this.translate.instant('add_to_cart.success');
    });
    if (this.slug) {
      this.productService.getProductBySlug(this.slug).subscribe(res => {
        this.product = res.data;
        this.initForm();
        this.getRates();
        this.router.events.subscribe((val) => {
          this.titleService.setTitle(this.product.name);
        });
        this.price = this.product.price;
        this.optionTypes = this.product.optionTypes;
        this.loaded = true;
      });
    }
  }

  changeImage(index: number): void {
    this.imageIndex = index;
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

  addToCart(): void {
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
  }

  buyNow(): void {
    this.addToCart();
    setTimeout(handler => {
      this.translate.get('menu.checkout.href').subscribe(e => {
        this.router.navigate([e]);
      });
    }, 200);
  }

  private calculateRate(): void {
    if (!this.rates || this.rates.length === 0) {
      this.productRate = 0;
      return;
    }
    const totalRate = this.rates.map(({rate}) => rate).reduce((a, b) => a + b, 0);
    this.productRate = totalRate / this.rates.length;
    this.productRate = Math.round(this.productRate * 10) / 10;
  }

  private getRates(page?): void {
    const params = {
      productId: this.product.id,
      page: page ? page : 1,
      size: 10
    };
    this.productService.getRates(params).subscribe(res => {
      this.rates = res.data.content;
      this.calculateRate();
    });
  }

  private initForm(): void {
    this.rate = 0;
    this.submitted = false;
    this.rateForm = this.fb.group({
      productId: [this.product.id],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      description: ['', Validators.required],
    });
  }

  rateProduct(event): void {
    event.preventDefault();
    this.submitted = true;
    if (this.rateForm.invalid) {
      return;
    }
    if (this.rate === 0) {
      this.translate.get('product.choose_rate').subscribe(s => {
        this.toast.showDanger(s);
      });
      return;
    }
    const body = {
      ...this.rateForm.value,
      rate: this.rate
    };
    this.productService.rate(body).subscribe(res => {
      this.initForm();
      this.toast.showSuccess(res.errorDescription);
      this.getRates(1);
    });
  }
}
