import { Component, OnInit } from '@angular/core';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { Utils } from '../../../shared/util/utils';
import { Action } from '../../../shared/model/action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../../service/role.service';
import { ToastService } from '../../../service/toast.service';
import { ActionService } from '../../../service/action.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  readonly statuses = Status;
  selectedAction: Action;
  actions: Action[];
  dateDdmmyyHhmmss: string;
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
    private actionService: ActionService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedAction = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getActions();
  }

  openModal(content, action?: Action): void {
    this.selectedAction = action;
    this.formUpdate = this.initForm(action);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, action: Action): void {
    this.selectedAction = action;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.actionService.delete(this.selectedAction.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getActions();
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
    if (this.formUpdate.invalid) {
      return;
    }
    if (this.selectedAction) {
      this.actionService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getActions();
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

    this.actionService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getActions();
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

  initForm(action): FormGroup {
    if (action) {
      return this.fb.group({
        id: [action.id, Validators.required],
        code: [action.code, Validators.required],
        name: [action.name, Validators.required],
        description: [action.description],
        status: [action.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      description: [null],
      status: ['', Validators.required],
    });
  }

  private getActions(): void {
    this.actionService.getActions(this.formSearch.value).subscribe(res => {
      this.actions = res.data.content;
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
    this.getActions();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.toast.show('' + this.page);
    this.formSearch.controls.page.setValue(this.page);
    this.getActions();
  }
}
