import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionService } from '../../../service/action.service';
import { RoleService } from '../../../service/role.service';
import { ToastService } from '../../../service/toast.service';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { Action } from '../../../shared/model/action';
import { Role } from '../../../shared/model/role';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  readonly statuses = Status;
  selectedRole: Role;
  roles: Role[];
  actions: Action[];
  selectedActionIds: number[];
  selectedActionNames: string;
  dateDdmmyyHhmmss: string;
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;
  isCollapsedActions: boolean;

  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastService,
    private roleService: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedRole = undefined;
    this.isCollapsedActions = true;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getRoles();
    this.getActiveActions();
  }

  openModal(content, role?: Role): void {
    this.selectedRole = role;
    this.formUpdate = this.initForm(role);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, role: Role): void {
    this.selectedRole = role;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.roleService.delete(this.selectedRole.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getRoles();
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
    if (this.selectedRole) {
      this.roleService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getRoles();
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

    this.roleService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getRoles();
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

  initForm(role): FormGroup {
    if (role) {
      this.selectedActionIds = role.actions.map(({id}) => id);
      this.selectedActionNames = role.actions.map(({code, name}) => code + ' - ' + name).join(', ');
      console.log('actions: ', this.selectedActionNames);
      return this.fb.group({
        id: [role.id, Validators.required],
        code: [role.code, Validators.required],
        name: [role.name, Validators.required],
        description: [role.description],
        status: [role.status, Validators.required],
        actionIds: ['', Validators.required],
      });
    }
    this.selectedActionIds = [];
    this.selectedActionNames = '';
    return this.fb.group({
      id: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      description: [null],
      status: ['', Validators.required],
      actionIds: ['', Validators.required],
    });
  }

  private getRoles(): void {
    this.roleService.getRoles(this.formSearch.value).subscribe(res => {
      this.roles = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getActiveActions(): void {
    this.actionService.getActionActives().subscribe(res => {
      this.actions = res.data;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  search(event): void {
    event.preventDefault();
    this.getRoles();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getRoles();
  }

  getActionCode(actions: Action[]): string {
    return actions.map(({code}) => code).join(', ');
  }

  toggleAction(event, id: number): void {
    event.preventDefault();
    const index: number = this.selectedActionIds.findIndex(value => value === id);
    if (index === -1) {
      this.selectedActionIds.push(id);
    } else {
      this.selectedActionIds.splice(index, 1);
    }
    const actions: Action[] = this.actions.filter(e => this.selectedActionIds.includes(e.id));
    this.selectedActionNames = actions.map(({code, name}) => code + ' - ' + name).join(', ');
    this.formUpdate.controls.actionIds.setValue(this.selectedActionIds);
  }
}
