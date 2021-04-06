import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../service/toast.service';
import { Constant } from '../../../shared/constants/constant.class';
import { Category } from '../../../shared/model/category';

export const Status = Object.freeze([
  {value: 1, name: 'Hoạt động'},
  {value: 2, name: 'Khóa'},
]);

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  readonly statuses = Status;
  selectedCategory: Category;
  categories: Category[];
  dateDdmmyyHhmmss: string;
  submitted: boolean;
  formGroup: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedCategory = undefined;
    this.categories = this.initCategory();
  }

  openModal(content, category?: Category): void {
    this.selectedCategory = category;
    this.formGroup = this.initForm(category);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, category: Category): void {
    this.selectedCategory = category;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() !== '') {
        this.toast.showSuccess(`delete category: ${category.name}`);
      }
    }, () => {
    });
  }

  submit(modal): void {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.toast.showSuccess(`success: ${this.selectedCategory}`);
    modal.dismiss();
  }

  initForm(category): FormGroup {
    if (category) {
      return this.fb.group({
        name: [category.name, Validators.required],
        description: [category.description],
        parent: [category.parent?.id],
        status: [category.status, Validators.required],
      });
    }
    return this.fb.group({
      name: [null, Validators.required],
      description: [null],
      parent: [null],
      status: [null, Validators.required],
    });
  }

  initCategory(): Category[] {
    const categories = [];
    categories.push({
      id: 1,
      name: 'Bánh kem',
      description: 'Bánh kem',
      parent: null,
      createdDate: new Date(),
      createdBy: null,
      updatedDate: new Date(),
      updatedBy: null,
      status: 1,
      statusName: 'Hoạt động',
    });
    categories.push({
      id: 2,
      name: 'Bánh kem 2',
      description: 'Bánh kem 2',
      parent: {
        id: 1,
        name: 'Bánh kem',
        description: 'Bánh kem',
        parent: null,
        createdDate: new Date(),
        createdBy: null,
        updatedDate: new Date(),
        updatedBy: null,
        status: 1,
        statusName: 'Hoạt động',
      },
      createdDate: new Date(),
      createdBy: null,
      updatedDate: new Date(),
      updatedBy: null,
      status: 1,
      statusName: 'Hoạt động',
    });
    categories.push({
      id: 3,
      name: 'Bánh kem 3',
      description: 'Bánh kem 3',
      parent: null,
      createdDate: new Date(),
      createdBy: null,
      updatedDate: new Date(),
      updatedBy: null,
      status: 1,
      statusName: 'Hoạt động',
    });
    categories.push({
      id: 4,
      name: 'Bánh kem 4',
      description: 'Bánh kem 4',
      parent: null,
      createdDate: new Date(),
      createdBy: null,
      updatedDate: new Date(),
      updatedBy: null,
      status: 0,
      statusName: 'Khóa',
    });
    return [...categories];
  }
}
