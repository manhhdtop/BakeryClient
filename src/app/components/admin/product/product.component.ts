import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../service/category.service';
import { ProductService } from '../../../service/product.service';
import { ToastService } from '../../../service/toast.service';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { Category } from '../../../shared/model/category';
import { Product } from '../../../shared/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly statuses = Status;
  selectedProduct: Product;
  products: Product[];
  categories: Category[];
  dateDdmmyyHhmmss: string;
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedProduct = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getProducts();
    this.getCategories();
  }

  openModal(content, category?: Product): void {
    this.selectedProduct = category;
    this.formUpdate = this.initForm(category);
    this.submitted = false;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  delete(content, category: Product): void {
    this.selectedProduct = category;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.categoryService.delete(this.selectedProduct.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getProducts();
            this.toast.showSuccess(res.errorDescription);
          } else {
            this.toast.showDanger(res.errorDescription);
          }
        }, error => {
          console.log('error: ', error);
          this.toast.showDanger(error.error.message);
        });
      }
    }, () => {
    });
  }

  submit(modal): void {
    this.submitted = true;
    if (this.formUpdate.invalid) {
      return;
    }
    if (this.selectedProduct) {
      this.categoryService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getProducts();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      }, error => {
        console.log('error: ', error);
        this.toast.showDanger(error.error.message);
      });
      return;
    }

    this.categoryService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getProducts();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    }, error => {
      console.log('error: ', error);
      this.toast.showDanger(error.error.message);
    });
  }

  initForm(category): FormGroup {
    if (category) {
      return this.fb.group({
        id: [category.id, Validators.required],
        name: [category.name, Validators.required],
        description: [category.description],
        parentId: [category.parent?.id],
        status: [category.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      name: [null, Validators.required],
      description: [null],
      parentId: [''],
      status: ['', Validators.required],
    });
  }

  private getCategories(): void {
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categories = res.data;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getProducts(): void {
    this.productService.getProducts(this.formSearch.value).subscribe(res => {
      this.categories = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  search(event): void {
    event.preventDefault();
    this.getProducts();
  }

  getStatusName(status: number): string {
    return this.statuses.filter(e => e.value === status)[0].name;
  }

  onPageChange(): void {
    this.toast.show('' + this.page);
    this.formSearch.controls.page.setValue(this.page);
    this.getProducts();
  }
}
