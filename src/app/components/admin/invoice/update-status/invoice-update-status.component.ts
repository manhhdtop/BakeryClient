import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceStatus } from 'src/app/shared/constants/constant.class';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-update-status',
  templateUrl: './invoice-update-status.component.html',
  styleUrls: ['./invoice-update-status.component.scss'],
})
export class InvoiceUpdateStatusComponent implements OnInit, OnChanges {
  private readonly invoiceStatus = InvoiceStatus;
  cancel = 'CANCEL';
  ok = 'OK';
  formGroup: FormGroup;
  acceptStatus: any[];

  @Input() status: number;
  @ViewChild('modal') modal;
  submitted: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    this.initForm();
    switch (this.status) {
      case 0:
        this.acceptStatus = this.invoiceStatus.filter(e => [1, -1].indexOf(e.value) > -1);
        break;
      case 1:
        this.acceptStatus = this.invoiceStatus.filter(e => e.value === 2);
        break;
      case 2:
        this.acceptStatus = this.invoiceStatus.filter(e => [3, -2, -1].indexOf(e.value) > -1);
        break;
      default:
        this.translate.get('invoice.update_status.status_invalid').subscribe(e => {
          this.toast.showDanger(e);
        });
    }
  }

  open(): Promise<string> {
    return this.modalService.open(this.modal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    }).result;
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      status: ['', Validators.required],
      description: [''],
    });
  }

  submit(modal): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      modal.close(this.ok);
    }
  }
}
