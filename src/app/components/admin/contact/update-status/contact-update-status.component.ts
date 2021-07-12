import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactStatus } from 'src/app/shared/constants/constant.class';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-update-status',
  templateUrl: './contact-update-status.component.html',
  styleUrls: ['./contact-update-status.component.scss'],
})
export class ContactUpdateStatusComponent implements OnInit, OnChanges {
  private readonly statuses = ContactStatus;
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
    this.acceptStatus = this.statuses.filter(e => e.value !== 0);
  }

  ngOnChanges(changes): void {
    this.initForm();
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
