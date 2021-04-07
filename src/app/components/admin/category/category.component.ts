import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../service/category.service';
import { ToastService } from '../../../service/toast.service';
import { Constant } from '../../../shared/constants/constant.class';
import { Category } from '../../../shared/model/category';

export const Status = [
  {value: 0, name: 'Chưa kích hoạt'},
  {value: 1, name: 'Hoạt động'},
  {value: -1, name: 'Khóa'},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  readonly statuses = Status;
  selectedCategory: Category;
  categories: Category[];
  parentCategories: Category[];
  dateDdmmyyHhmmss: string;
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedCategory = undefined;
    const nameParam = this.activatedRoute.snapshot.queryParams.name;
    this.getCategory(nameParam);
    this.getParentCategories();
    this.formSearch = this.fb.group({
      keyword: [null],
    });
  }

  openModal(content, category?: Category): void {
    this.selectedCategory = category;
    this.formUpdate = this.initForm(category);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, category: Category): void {
    this.selectedCategory = category;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.categoryService.delete(this.selectedCategory.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getCategory();
            this.getParentCategories();
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
    if (this.selectedCategory) {
      this.categoryService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getCategory();
          this.getParentCategories();
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
        this.getCategory();
        this.getParentCategories();
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

  private getParentCategories(): void {
    this.categoryService.getParentCategories().subscribe(res => {
      this.parentCategories = res.data;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getCategory(nameParam?): void {
    this.categoryService.getCategories(nameParam).subscribe(res => {
      this.categories = res.data;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  search(event): void {
    event.preventDefault();
    const keyword = this.formSearch.controls.keyword.value?.trim();
    if (keyword) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          name: keyword,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(
        ['.'],
        {relativeTo: this.activatedRoute, queryParams: {}},
      );
    }
    this.getCategory(keyword);
  }

  getStatusName(status: number): string {
    return this.statuses.filter(e => e.value === status)[0].name;
  }
}
