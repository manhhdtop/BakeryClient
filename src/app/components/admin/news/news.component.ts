import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from 'src/app/shared/constants/constant.class';
import { News } from 'src/app/shared/model/news';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CkeditorComponent } from 'src/app/shared/component/ckeditor/ckeditor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/service/app-config.service';
import { NewsService } from 'src/app/service/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { Utils } from 'src/app/shared/util/utils';
import { UploadResponse } from 'src/app/shared/model/upload-response';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  readonly statuses = Status;
  currentNews: News;
  newsList: News[];
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;
  baseUrl: string;
  image: UploadResponse;

  @ViewChild(CkeditorComponent) ckeditorModal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appConfigService: AppConfigService,
    private fb: FormBuilder,
    private newsService: NewsService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastService,
    private uploadService: UploadService,
  ) {
  }

  ngOnInit(): void {
    this.baseUrl = this.appConfigService.getConfig().api.baseUrl;
    this.currentNews = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getNews();
  }

  openModal(content, news?: News): void {
    this.currentNews = news;
    this.formUpdate = this.initForm(news);
    this.submitted = false;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      backdrop: false,
    });
  }

  delete(content, news: News): void {
    this.currentNews = news;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.newsService.delete(this.currentNews.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getNews();
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
    const body = this.formUpdate.value;
    body.imageUpload = this.image;
    if (this.currentNews) {
      this.newsService.update(body).subscribe(res => {
        if (res.errorCode === '200') {
          this.getNews();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      });
      return;
    }

    this.newsService.save(body).subscribe(res => {
      if (res.errorCode === '200') {
        this.getNews();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  initForm(news): FormGroup {
    if (news) {
      this.image = news.image;
      return this.fb.group({
        id: [news.id, Validators.required],
        name: [news.name, Validators.required],
        slug: [news.slug, Validators.required],
        imageUpload: [news.image?.fileName, Validators.required],
        description: [news.description],
        content: [news.content, Validators.required],
        status: [news.status, Validators.required],
      });
    }
    this.image = undefined;
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      slug: ['', Validators.required],
      imageUpload: ['', Validators.required],
      description: [''],
      content: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getNews(): void {
    this.newsService.getAdminNews(this.formSearch.value).subscribe(res => {
      this.newsList = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    });
  }

  search(event): void {
    event.preventDefault();
    this.getNews();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getNews();
  }

  getSlug(): void {
    this.newsService.createSlug(this.formUpdate.controls.name.value).subscribe(res => {
      this.formUpdate.controls.slug.setValue(res.data);
    });
  }

  writeDescription(event): void {
    event.preventDefault();
    this.ckeditorModal.open(this.formUpdate.controls.description.value).then(() => {
      this.formUpdate.controls.description.setValue(this.ckeditorModal.changedData);
    }, () => {
    });
  }

  writeContent(event): void {
    event.preventDefault();
    this.ckeditorModal.open(this.formUpdate.controls.content.value).then(() => {
      this.formUpdate.controls.content.setValue(this.ckeditorModal.changedData);
    }, () => {
    });
  }

  processFile(imageInput: any): void {
    const formData: FormData = new FormData();
    formData.append('file', imageInput.files[0]);
    this.uploadService.uploadImage(formData).subscribe(res => {
      this.image = res;
      this.formUpdate.controls.imageUpload.setValue(res.fileName);
    });
  }
}
