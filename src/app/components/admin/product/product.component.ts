import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from '../../../service/app-config.service';
import { CategoryService } from '../../../service/category.service';
import { ProductService } from '../../../service/product.service';
import { ToastService } from '../../../service/toast.service';
import { UploadService } from '../../../service/upload.service';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { Category } from '../../../shared/model/category';
import { Product } from '../../../shared/model/product';
import { UploadResponse } from '../../../shared/model/upload-response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly statuses = Status;
  selectedProduct: Product;
  selectedImage: UploadResponse;
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
  images: string;
  baseUrl: string;
  files: UploadResponse[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appConfigService: AppConfigService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastService,
    private uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.appConfigService.getConfig().api.baseUrl;
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

  openImage(content, image: UploadResponse): void {
    this.selectedImage = image;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
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
    if (this.formUpdate.invalid || !this.files || this.files.length === 0) {
      return;
    }
    this.formUpdate.controls.imageUploads.setValue(this.files);
    if (this.selectedProduct) {
      this.productService.update(this.formUpdate.value).subscribe(res => {
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

    this.productService.save(this.formUpdate.value).subscribe(res => {
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

  initForm(product): FormGroup {
    if (product) {
      this.files = product.images;
      this.getListFileName(this.files);
      return this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        description: [product.description],
        categoryId: [product.category.id],
        imageUploads: [null],
        status: [product.status, Validators.required],
      });
    }
    this.images = '';
    this.files = [];
    return this.fb.group({
      id: [null],
      name: [null, Validators.required],
      description: [null],
      categoryId: [''],
      imageUploads: [null],
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
      this.products = res.data.content;
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

  processFile(imageInput: any): void {
    const formData: FormData = new FormData();
    const fileArray: File[] = Array.from(imageInput.files);
    for (const f of fileArray) {
      formData.append('files', f);
    }
    this.uploadService.uploadImages(formData).subscribe(res => {
      console.log();
      this.files = this.files.concat(res);
      this.getListFileName(res);
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getListFileName(uploadFileResponses): void {
    let s = '';
    this.files.forEach(e => {
      console.log('file: ', e);
      if (s === '') {
        s += e.fileName;
      } else {
        s += '; ' + e.fileName;
      }
    });
    this.images = s;
  }

  removeImage(file): void {
    this.files = this.files.filter(e => {
      return e !== file;
    });
  }
}
