import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Editor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from '../../../service/app-config.service';
import { UrlConstant } from '../../constants/url.class';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
})
export class CkeditorComponent implements OnInit {
  @Input() title: string;
  data: string;
  @ViewChild('content') content;

  editor = Editor;
  // ckfinder = Ckfinder;
  configEditor: any;
  changedData: string;

  constructor(
    protected configService: AppConfigService,
    private modalService: NgbModal,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.configEditor = {
      toolbar: [
        'undo', 'redo',
        'heading', '|',
        'fontfamily', 'fontsize', '|',
        'alignment', '|',
        'ckfinder', 'uploadImage',
        'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'underline', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', '|',
        'insertTable', '|', 'blockQuote', '|',
      ],
      ckfinder: {
        uploadUrl: this.configService.getConfig().api.baseUrl + UrlConstant.CK_UPLOAD_IMAGES,
        options: {
          resourceType: 'Images',
          openerMethod: 'modal',
        },
      },
      filebrowserUploadUrl: this.configService.getConfig().api.baseUrl + UrlConstant.CK_UPLOAD_IMAGES,
      fileTools_requestHeaders: {
        'X-Requested-With': 'xhr',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
      filebrowserUploadMethod: 'xhr',
      on: {
        instanceReady(evt): void {
          const editor = evt.editor;
          console.log('editor ===>', editor);
        },
        fileUploadRequest(evt): void {
          console.log('evt ===>', evt);
        },
      },
    };
  }

  open(data): Promise<any> {
    this.data = data;
    this.changedData = this.data;
    return this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdrop: false,
      keyboard: false,
    }).result;
  }

  public onReady(editor): void {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
    );
    if (this.changedData) {
      editor.setData(this.changedData);
    }
  }

  save(modal, cancelModal): void {
    if (this.changedData === this.data) {
      this.changedData = this.data;
      modal.dismiss();
    } else {
      this.modalService.open(cancelModal).result.then((result) => {
        if (result && result === 'ok') {
          modal.close();
        } else {
          this.changedData = this.data;
          modal.dismiss();
        }
      });
    }
  }
}
