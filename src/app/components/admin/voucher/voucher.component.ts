import { Component, OnInit } from '@angular/core';
import { Constant, Status, VoucherType } from 'src/app/shared/constants/constant.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/service/role.service';
import { ToastService } from 'src/app/service/toast.service';
import { Utils } from 'src/app/shared/util/utils';
import { VoucherService } from 'src/app/service/voucher.service';
import { Voucher } from 'src/app/shared/model/Voucher';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  readonly statuses = Status;
  readonly types = VoucherType;
  selectedVoucher: Voucher;
  vouchers: Voucher[];
  dateDdmmyyHhmmss: string;
  dateDdmmyy: string;
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
    private voucherService: VoucherService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.dateDdmmyy = Constant.DATE_FMT;
    this.selectedVoucher = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getVouchers();
  }

  openModal(content, voucher?: Voucher): void {
    this.selectedVoucher = voucher;
    this.formUpdate = this.initForm(voucher);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, voucher: Voucher): void {
    this.selectedVoucher = voucher;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.voucherService.delete(this.selectedVoucher.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getVouchers();
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
    console.log(this.formUpdate.value);
    if (this.formUpdate.invalid) {
      return;
    }
    if (this.selectedVoucher) {
      this.voucherService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getVouchers();
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

    this.voucherService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getVouchers();
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

  initForm(voucher): FormGroup {
    if (voucher) {
      return this.fb.group({
        id: [voucher.id, Validators.required],
        code: [voucher.code, Validators.required],
        name: [voucher.name, Validators.required],
        value: [voucher.value, [Validators.required, Validators.min(1)]],
        startDate: [voucher.startDate, Validators.required],
        endDate: [voucher.endDate, Validators.required],
        type: [voucher.type, Validators.required],
        status: [voucher.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
      minAmount: [null, [Validators.required, Validators.min(1)]],
      maxAmount: [null, [Validators.required, Validators.min(1)]],
      startDate: [null, Validators.required, {updateOn: 'change'}],
      endDate: [null, Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
    }, {
      validators: [this.maxAmountMustGreaterThanMinAmount('minAmount', 'maxAmount')],
    });
  }

  maxAmountMustGreaterThanMinAmount(minAmount, maxAmount): any {
    return (group: FormGroup): any => {
      const minAmountControl = group.controls[minAmount];
      const maxAmountControl = group.controls[maxAmount];
      if (minAmountControl.value && maxAmountControl.value && Number(minAmountControl.value) > 0 && Number(maxAmountControl.value) > 0) {
        if (Number(minAmountControl.value) >= Number(maxAmountControl.value)) {
          maxAmountControl.setErrors({maxAmountMustGreaterThanMinAmount: true});
          minAmountControl.setErrors({maxAmountMustGreaterThanMinAmount: true});
        } else {
          maxAmountControl.setErrors(null);
          minAmountControl.setErrors(null);
        }
      } else {
        if (minAmountControl.value && Number(minAmountControl.value) > 0
          && (!maxAmountControl.value || Number(maxAmountControl.value) <= 0)) {
          minAmountControl.setErrors(null);
        } else {
          if (maxAmountControl.value && Number(maxAmountControl.value) > 0
            && (!minAmountControl.value || Number(minAmountControl.value) <= 0)) {
            maxAmountControl.setErrors(null);
          }
        }
      }
    };
  }

  private getVouchers(): void {
    this.voucherService.getVouchers(this.formSearch.value).subscribe(res => {
      this.vouchers = res.data.content;
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
    this.getVouchers();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getVouchers();
  }

  changeType(value: number): void {
    if (value === 1) {
      this.formUpdate.controls.value.setValidators([Validators.required, Validators.min(1)]);
    } else {
      if (value === 2) {
        this.formUpdate.controls.value.setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
      }
    }
    this.formUpdate.controls.value.updateValueAndValidity();
  }

  generateCode(): void {
    this.voucherService.generateCode().subscribe(res => {
      if (res.errorCode === '200') {
        this.formUpdate.controls.code.setValue(res.data);
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    }, error => {
      this.toast.showDanger(error?.error?.message ? error.error.message : '');
    });
  }
}
