import { Component, OnInit, ViewChild } from '@angular/core';
import { Constant, EditorType, Status } from 'src/app/shared/constants/constant.class';
import { UploadResponse } from 'src/app/shared/model/upload-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CkeditorComponent } from 'src/app/shared/component/ckeditor/ckeditor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { Utils } from 'src/app/shared/util/utils';
import { MailTemplate } from 'src/app/shared/model/mail-template';
import { MailTemplateService } from 'src/app/service/mail-template.service';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.scss'],
})
export class MailTemplateComponent implements OnInit {
  readonly statuses = Status;
  currentTemplate: MailTemplate;
  selectedImage: UploadResponse;
  templates: MailTemplate[];
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;
  images: string;
  readonly EditorType = EditorType;

  @ViewChild(CkeditorComponent) ckeditorModal;

  constructor(
    private fb: FormBuilder,
    private mailTemplateService: MailTemplateService,
    private modalService: NgbModal,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.currentTemplate = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getMailTemplates();
  }

  openModal(content, template?: MailTemplate): void {
    this.currentTemplate = template;
    this.formUpdate = this.initForm(template);
    this.submitted = false;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdrop: false,
    });
  }

  delete(content, category: MailTemplate): void {
    this.currentTemplate = category;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.mailTemplateService.delete(this.currentTemplate.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getMailTemplates();
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
    if (this.currentTemplate) {
      this.mailTemplateService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getMailTemplates();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      });
      return;
    }

    this.formUpdate.controls.id.setValue(null);
    this.mailTemplateService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getMailTemplates();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  initForm(template): FormGroup {
    if (template) {
      return this.fb.group({
        id: [template.id, Validators.required],
        code: [template.code, [Validators.required, Validators.pattern(Constant.TEMPLATE_CODE_PATTERN)]],
        name: [template.name, Validators.required],
        subject: [template.subject, Validators.required],
        message: [template.message],
        status: [template.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      code: ['', [Validators.required, Validators.pattern(Constant.TEMPLATE_CODE_PATTERN)]],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getMailTemplates(): void {
    this.mailTemplateService.search(this.formSearch.value).subscribe(res => {
      this.templates = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    });
  }

  search(event): void {
    event.preventDefault();
    this.getMailTemplates();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getMailTemplates();
  }

  openCkEditor(event): void {
    event.preventDefault();
    this.ckeditorModal.open(this.formUpdate.controls.message.value).then(() => {
      this.formUpdate.controls.message.setValue(this.ckeditorModal.changedData);
    }, () => {
    });
  }
}
