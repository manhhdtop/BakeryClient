import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from 'src/app/shared/model/invoice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Constant, InvoiceStatus } from 'src/app/shared/constants/constant.class';
import { Utils } from 'src/app/shared/util/utils';
import { InvoiceUpdateStatusComponent } from 'src/app/components/admin/invoice/update-status/invoice-update-status.component';
import { AppConfigService } from 'src/app/service/app-config.service';
import { InvoiceUpdateStatus } from 'src/app/shared/model/invoice-update-status';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  baseUrl: string;
  readonly statuses = InvoiceStatus;
  invoices: Invoice[];
  selectedInvoice: Invoice;
  dateDdmmyyHhmmss: string;
  dateDdmmyy: string;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;
  updateStatusTitle: string;
  updateStatusContent: string;
  modalViewOpen: boolean;

  @ViewChild(InvoiceUpdateStatusComponent) updateStatusModal;
  @ViewChild('viewInvoice') viewInvoice;

  constructor(
    private configService: AppConfigService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.configService.getConfig().api.baseUrl;
    this.modalViewOpen = false;
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.dateDdmmyy = Constant.DATE_FMT;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getInvoice();
  }

  private getInvoice(): void {
    const params = this.formSearch.value;
    params.keyword = params.keyword ? params.keyword.trim() : '';
    this.invoiceService.getInvoices(params).subscribe(res => {
      if (res.errorCode === '200') {
        this.invoices = res.data.content;
        this.page = res.data.pageable.pageNumber + 1;
        this.size = res.data.pageable.pageSize;
        this.totalItem = res.data.totalElements;
        this.currentItems = res.data.numberOfElements;
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getInvoice();
  }

  updateStatus(invoice): void {
    this.selectedInvoice = invoice;
    setTimeout((handler) => {
      this.updateStatusModal.open().then(result => {
        if (result === this.updateStatusModal.ok) {
          const data: InvoiceUpdateStatus = this.updateStatusModal.formGroup.value;
          data.id = invoice.id;
          this.invoiceService.updateStatus(data).subscribe(res => {
            if (res.errorCode === '200') {
              this.toast.showSuccess(res.errorDescription);
              this.getInvoice();
              this.updateStatusModal.initForm();
            } else {
              this.toast.showDanger(res.errorDescription);
            }
          });
        }
      }, () => {
        this.selectedInvoice = undefined;
      });
    }, 10);
  }

  getStatusName(status): string {
    return Utils.getInvoiceStatusName(status);
  }

  search(event): void {
    event.preventDefault();
    this.getInvoice();
  }

  view(modal, invoice): void {
    this.selectedInvoice = invoice;
    this.modalViewOpen = true;
    setTimeout((handler) => {
      this.modalService.open(modal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      }).result.then(res => {
      }, () => {
        this.selectedInvoice = undefined;
        this.modalViewOpen = false;
      });
    }, 100);
  }
}
