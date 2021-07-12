import { Component, OnInit, ViewChild } from '@angular/core';
import { Constant, ContactStatus } from 'src/app/shared/constants/constant.class';
import { Contact } from 'src/app/shared/model/contact';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConfigService } from 'src/app/service/app-config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from 'src/app/service/contact.service';
import { ContactUpdateStatus } from 'src/app/shared/model/contact-update-status';
import { Utils } from 'src/app/shared/util/utils';
import { ContactUpdateStatusComponent } from 'src/app/components/admin/contact/update-status/contact-update-status.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  baseUrl: string;
  readonly statuses = ContactStatus;
  contacts: Contact[];
  selectedContact: Contact;
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

  @ViewChild(ContactUpdateStatusComponent) updateStatusModal;
  @ViewChild('viewContact') viewContact;

  constructor(
    private configService: AppConfigService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toast: ToastService,
    private translate: TranslateService,
    private contactService: ContactService,
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
    this.getContact();
  }

  private getContact(): void {
    const params = this.formSearch.value;
    params.keyword = params.keyword ? params.keyword.trim() : '';
    this.contactService.getContacts(params).subscribe(res => {
      if (res.errorCode === '200') {
        this.contacts = res.data.content;
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
    this.getContact();
  }

  updateStatus(contact): void {
    this.selectedContact = contact;
    setTimeout((handler) => {
      this.updateStatusModal.open().then(result => {
        if (result === this.updateStatusModal.ok) {
          const data: ContactUpdateStatus = this.updateStatusModal.formGroup.value;
          data.id = contact.id;
          this.contactService.updateStatus(data).subscribe(res => {
            if (res.errorCode === '200') {
              this.toast.showSuccess(res.errorDescription);
              this.getContact();
              this.updateStatusModal.initForm();
            } else {
              this.toast.showDanger(res.errorDescription);
            }
          });
        }
      }, () => {
        this.selectedContact = undefined;
      });
    }, 10);
  }

  getStatusName(status): string {
    return Utils.getContactStatusName(status);
  }

  search(event): void {
    event.preventDefault();
    this.getContact();
  }

  view(modal, contact): void {
    this.selectedContact = contact;
    this.modalViewOpen = true;
    setTimeout((handler) => {
      this.modalService.open(modal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      }).result.then(res => {
      }, () => {
        this.selectedContact = undefined;
        this.modalViewOpen = false;
      });
    }, 100);
  }
}
