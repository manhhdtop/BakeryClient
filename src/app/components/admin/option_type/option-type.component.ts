import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionTypeService } from '../../../service/option-type.service';
import { RoleService } from '../../../service/role.service';
import { ToastService } from '../../../service/toast.service';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { OptionType } from '../../../shared/model/option-type';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-option',
  templateUrl: './option-type.component.html',
  styleUrls: ['./option-type.component.css'],
})
export class OptionTypeComponent implements OnInit {
  readonly statuses = Status;
  selectedOption: OptionType;
  options: OptionType[];
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
    private fb: FormBuilder,
    private modalService: NgbModal,
    private roleService: RoleService,
    private router: Router,
    private toast: ToastService,
    private optionTypeService: OptionTypeService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedOption = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getOptionTypes();
  }

  openModal(content, option?: OptionType): void {
    this.selectedOption = option;
    this.formUpdate = this.initForm(option);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, option: OptionType): void {
    this.selectedOption = option;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.optionTypeService.delete(this.selectedOption.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getOptionTypes();
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
    if (this.formUpdate.invalid) {
      return;
    }
    const data = this.formUpdate.value;
    data.changePrice = data.changePrice === 1;
    if (this.selectedOption) {
      this.optionTypeService.update(data).subscribe(res => {
        if (res.errorCode === '200') {
          this.getOptionTypes();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      });
      return;
    }

    data.id = undefined;
    this.optionTypeService.save(data).subscribe(res => {
      if (res.errorCode === '200') {
        this.getOptionTypes();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  initForm(option): FormGroup {
    if (option) {
      return this.fb.group({
        id: [option.id, Validators.required],
        name: [option.name, Validators.required],
        description: [option.description],
        changePrice: [option.changePrice ? 1 : 0, Validators.required],
        status: [option.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      name: [null, Validators.required],
      description: [null],
      changePrice: [0, Validators.required],
      status: ['', Validators.required],
    });
  }

  private getOptionTypes(): void {
    this.optionTypeService.getOptionTypes(this.formSearch.value).subscribe(res => {
      this.options = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    });
  }

  search(event): void {
    event.preventDefault();
    this.getOptionTypes();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getOptionTypes();
  }
}
