import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from '../../../service/app-config.service';
import { CategoryService } from '../../../service/category.service';
import { OptionTypeService } from '../../../service/option-type.service';
import { ProductService } from '../../../service/product.service';
import { ToastService } from '../../../service/toast.service';
import { UploadService } from '../../../service/upload.service';
import { CkeditorComponent } from '../../../shared/component/ckeditor/ckeditor.component';
import { EditorType, Status } from '../../../shared/constants/constant.class';
import { Category } from '../../../shared/model/category';
import { Option } from '../../../shared/model/option';
import { OptionType } from '../../../shared/model/option-type';
import { Product } from '../../../shared/model/product';
import { UploadResponse } from '../../../shared/model/upload-response';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly statuses = Status;
  currentProduct: Product;
  selectedImage: UploadResponse;
  products: Product[];
  categories: Category[];
  optionTypes: OptionType[];
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
  readonly EditorType = EditorType;

  @ViewChild(CkeditorComponent) ckeditorModal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appConfigService: AppConfigService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private optionTypeService: OptionTypeService,
    private productService: ProductService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastService,
    private uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.appConfigService.getConfig().api.baseUrl;
    this.currentProduct = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getProducts();
    this.getCategories();
    this.getOptionType();
  }

  openModal(content, product?: Product): void {
    this.currentProduct = product;
    this.formUpdate = this.initForm(product);
    this.submitted = false;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdrop: false,
    });
  }

  openImage(content, index): void {
    this.selectedImage = this.files[index];
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  delete(content, category: Product): void {
    this.currentProduct = category;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.productService.delete(this.currentProduct.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getProducts();
            this.toast.showSuccess(res.errorDescription);
          } else {
            this.toast.showDanger(res.errorDescription);
          }
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
    const body = {...this.formUpdate.value, productOptions: this.getOptions()};
    body.price = body.price.toString().replace('.', '');
    if (this.currentProduct) {
      this.productService.update(body).subscribe(res => {
        if (res.errorCode === '200') {
          this.getProducts();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      });
      return;
    }

    this.productService.save(body).subscribe(res => {
      if (res.errorCode === '200') {
        this.getProducts();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  initForm(product): FormGroup {
    if (product) {
      this.files = product.images;
      this.getListFileName();

      if (product.options) {
        this.optionTypes.forEach(e => {
          const options = product.options.filter(o => {
            return o.optionType.id === e.id;
          });
          if (options && options.length > 0) {
            e.options = options;
          }
        });
      }
      this.initOption();
      return this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        slug: [product.slug, Validators.required],
        description: [product.description],
        price: [product.price, Validators.required],
        categoryId: [product.category.id],
        imageUploads: [null],
        status: [product.status, Validators.required],
      });
    }
    this.images = '';
    this.files = [];
    this.initOption();
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId: [''],
      imageUploads: [''],
      status: ['', Validators.required],
    });
  }

  private getCategories(): void {
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categories = res.data;
    });
  }

  private getOptionType(): void {
    this.optionTypeService.getOptionTypes().subscribe(res => {
      this.optionTypes = res.data.content;
    });
  }

  private getProducts(): void {
    this.productService.getAdminProducts(this.formSearch.value).subscribe(res => {
      this.products = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    });
  }

  search(event): void {
    event.preventDefault();
    this.getProducts();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
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
      this.files = this.files.concat(res);
      this.getListFileName();
    });
  }

  private getListFileName(): void {
    this.images = this.files.map(({fileName}) => fileName).join(', ');
  }

  removeImage(file): void {
    this.files = this.files.filter(e => {
      return e !== file;
    });
  }

  getSlug(): void {
    this.productService.createSlug(this.formUpdate.controls.name.value).subscribe(res => {
      this.formUpdate.controls.slug.setValue(res.data);
    });
  }

  openCkEditor(event): void {
    event.preventDefault();
    this.ckeditorModal.open(this.formUpdate.controls.description.value).then(() => {
      this.formUpdate.controls.description.setValue(this.ckeditorModal.changedData);
    }, () => {
    });
  }

  addOption(ot: OptionType): void {
    if (!ot.options) {
      ot.options = [];
    }
    ot.options.push({
      id: null,
      productId: this.currentProduct?.id,
      value: '',
      optionType: {...ot, options: undefined},
    });
  }

  removeOption(ot: OptionType, index): void {
    ot.options.splice(index, 1);
  }

  private getOptions(): Option[] {
    let options = [];
    this.optionTypes.forEach(e => {
      options = options.concat(e.options);
    });
    options = options.filter(e => {
      return e.value !== '';
    });
    return options;
  }

  private initOption(): void {
    this.optionTypes.forEach(e => {
      if (!e.options || e.options.length <= 0) {
        this.addOption(e);
      }
    });
  }
}
