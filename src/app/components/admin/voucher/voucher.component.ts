import { Component, OnInit, ViewChild } from '@angular/core';
import { Constant, Status, VoucherType } from 'src/app/shared/constants/constant.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/service/role.service';
import { ToastService } from 'src/app/service/toast.service';
import { Utils } from 'src/app/shared/util/utils';
import { VoucherService } from 'src/app/service/voucher.service';
import { Voucher } from 'src/app/shared/model/voucher';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { DateFormatPipe } from 'src/app/shared/pipe/format-date.pipe';

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
  updateStatusTitle: string;
  updateStatusContent: string;
  updateStatusActive: string;
  updateStatusDeactive: string;
  updateStatusLock: string;
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;

  @ViewChild(ConfirmComponent) confirmModal;

  constructor(
    private dateFormatPipe: DateFormatPipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
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
    this.translate.get('voucher.update_status_title').subscribe(e => {
      this.updateStatusTitle = e;
      this.updateStatusDeactive = this.translate.instant('voucher.update_status_deactive');
      this.updateStatusActive = this.translate.instant('voucher.update_status_active');
      this.updateStatusLock = this.translate.instant('voucher.update_status_lock');
    });
  }

  openModal(content, voucher?: Voucher): void {
    this.selectedVoucher = voucher;
    this.formUpdate = this.initForm(voucher);
    this.submitted = false;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: false,
    });
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
    data.startDate = this.convertStringToDate(data.startDate);
    data.endDate = this.convertStringToDate(data.endDate);
    if (this.selectedVoucher) {
      this.voucherService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getVouchers();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
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
    });
  }

  initForm(voucher): FormGroup {
    if (voucher) {
      const dateFormat = 'dd/MM/yyyy HH:mm:ss';
      return this.fb.group({
        id: [voucher.id, Validators.required],
        code: [voucher.code, Validators.required],
        name: [voucher.name, Validators.required],
        value: [voucher.value, [Validators.required, Validators.min(1)]],
        minAmount: [voucher.minAmount, Validators.min(1)],
        maxAmount: [voucher.maxAmount, Validators.min(1)],
        minRefund: [voucher.minRefund, Validators.min(1)],
        maxRefund: [voucher.maxRefund, Validators.min(1)],
        startDate: [this.dateFormatPipe.transform(new Date(voucher.startDate), dateFormat), Validators.required],
        endDate: [this.dateFormatPipe.transform(new Date(voucher.endDate), dateFormat), Validators.required],
        type: [voucher.type, Validators.required],
        quantity: [voucher.quantity, [Validators.required, Validators.min(1)]],
      }, {
        validators: [
          this.maxAmountMustGreaterThanMinAmount('minAmount', 'maxAmount'),
          this.maxRefundMustGreaterThanMinRefund('minRefund', 'maxRefund'),
        ],
      });
    }
    return this.fb.group({
      id: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      value: [null, [Validators.required, Validators.min(1)]],
      minAmount: [null, Validators.min(1)],
      maxAmount: [null, Validators.min(1)],
      minRefund: [null, Validators.min(1)],
      maxRefund: [null, Validators.min(1)],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      type: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    }, {
      validators: [
        this.maxAmountMustGreaterThanMinAmount('minAmount', 'maxAmount'),
        this.maxRefundMustGreaterThanMinRefund('minRefund', 'maxRefund'),
        this.startDateNotAfterEndDate('startDate', 'endDate'),
      ],
    });
  }

  maxAmountMustGreaterThanMinAmount(minAmount, maxAmount): any {
    return (group: FormGroup): any => {
      const minAmountControl = group.controls[minAmount];
      const maxAmountControl = group.controls[maxAmount];
      if (minAmountControl.value && maxAmountControl.value && Number(minAmountControl.value) > 0 && Number(maxAmountControl.value) > 0) {
        if (Number(minAmountControl.value) > Number(maxAmountControl.value)) {
          maxAmountControl.setErrors({maxAmountNotLessThanMinAmount: true});
        } else {
          maxAmountControl.setErrors(null);
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

  maxRefundMustGreaterThanMinRefund(minRefund, maxRefund): any {
    return (group: FormGroup): any => {
      const minRefundControl = group.controls[minRefund];
      const maxRefundControl = group.controls[maxRefund];
      if (minRefundControl.value && maxRefundControl.value && Number(minRefundControl.value) > 0 && Number(maxRefundControl.value) > 0) {
        if (Number(minRefundControl.value) > Number(maxRefundControl.value)) {
          maxRefundControl.setErrors({maxRefundNotLessThanMinRefund: true});
        } else {
          maxRefundControl.setErrors(null);
        }
      } else {
        if (minRefundControl.value && Number(minRefundControl.value) > 0
          && (!maxRefundControl.value || Number(maxRefundControl.value) <= 0)) {
          minRefundControl.setErrors(null);
        } else {
          if (maxRefundControl.value && Number(maxRefundControl.value) > 0
            && (!minRefundControl.value || Number(minRefundControl.value) <= 0)) {
            maxRefundControl.setErrors(null);
          }
        }
      }
    };
  }

  startDateNotAfterEndDate(startDateName, endDateName): any {
    return (group: FormGroup): any => {
      const startDateControl = group.controls[startDateName];
      const endDateControl = group.controls[endDateName];
      const startDate = this.convertStringToDate(startDateControl.value);
      const endDate = this.convertStringToDate(endDateControl.value);
      if (startDate && endDate) {
        if (startDate.getTime() >= endDate.getTime()) {
          endDateControl.setErrors({startDateNotAfterEndDate: true});
        } else {
          endDateControl.setErrors(null);
        }
      } else {
        const now = new Date().getTime();
        if (startDate && startDate.getTime() > now && (!endDate || endDate.getTime() < now)) {
          startDateControl.setErrors(null);
        } else {
          if (endDate && endDate.getTime() > now
            && (startDate || startDate.getTime() <= now)) {
            endDateControl.setErrors(null);
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
    });
  }

  private convertStringToDate(value: string): Date {
    if (!value || value.trim() === '') {
      return undefined;
    }
    const datetime = value.split(' ');
    const date = datetime[0].split('/');
    const time = datetime[1]?.split(':');
    const day = parseInt(date[0], 10);
    const month = parseInt(date[1], 10) - 1;
    const year = parseInt(date[2], 10);
    const hour = time ? parseInt(time[0], 10) : undefined;
    const minute = time ? parseInt(time[1], 10) : undefined;
    return new Date(year, month, day, hour, minute);
  }

  updateStatus(v: Voucher): void {
    let status;
    switch (v.status) {
      case 0:
        status = 1;
        this.updateStatusContent = this.updateStatusDeactive;
        break;
      case 1:
        status = -1;
        this.updateStatusContent = this.updateStatusActive;
        break;
      case -1:
        status = 1;
        this.updateStatusContent = this.updateStatusLock;
        break;
      default:
        break;
    }
    if (!status) {
      this.translate.get('voucher.status_invalid').subscribe(e => {
        this.toast.showDanger(e);
      });
      return;
    }
    this.confirmModal.open().then((result) => {
      if (result === this.confirmModal.ok) {
        const data = {
          id: v.id,
          status,
        };
        this.voucherService.updateStatus(data).subscribe(res => {
          if (res.errorCode === '200') {
            this.toast.showSuccess(res.errorDescription);
            setTimeout((handler) => {
              this.getVouchers();
            }, 500);
          } else {
            this.toast.showDanger(res.errorDescription);
          }
        });
      }
    });

  }
}
