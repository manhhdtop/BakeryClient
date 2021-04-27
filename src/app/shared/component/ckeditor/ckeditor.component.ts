import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '../../../../assets/ckeditor5';
import { AppConfigService } from '../../../service/app-config.service';
import { UploadAdapter } from './UploadAdapter';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
})
export class CkeditorComponent implements OnInit {
  @Input() title: string;
  @Input() type: number;
  data: string;
  @ViewChild('content') content;

  editor = ClassicEditor;
  configEditor: any;
  changedData: string;

  constructor(
    protected configService: AppConfigService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.configEditor = {
      extraPlugins: [UploadAdapterPlugin],
    };
  }

  open(data): Promise<any> {
    this.changedData = this.data = data;
    return this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdrop: false,
      keyboard: false,
    }).result;
  }

  public onReady(editor): void {
    if (this.changedData) {
      editor.setData(this.changedData);
    }
  }

  save(modal, cancelModal): void {
    if (this.changedData === this.data) {
      modal.dismiss();
    } else {
      this.modalService.open(cancelModal).result.then((result) => {
        if (result && result === 'ok') {
          modal.close();
        } else {
          modal.dismiss();
        }
      });
    }
  }
}

function UploadAdapterPlugin(editor): void {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}
