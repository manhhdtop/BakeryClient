import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../../service/role.service';
import { ToastService } from '../../../service/toast.service';
import { UserService } from '../../../service/user.service';
import { Constant, Status } from '../../../shared/constants/constant.class';
import { Role } from '../../../shared/model/role';
import { User } from '../../../shared/model/user';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  readonly statuses = Status;
  selectedUser: User;
  users: User[];
  roles: Role[];
  dateDdmmyyHhmmss: string;
  submitted: boolean;
  formUpdate: FormGroup;
  formSearch: FormGroup;
  page: number;
  size: number;
  totalItem: number;
  currentItems: number;
  selectedRoleIds: number[];
  selectedRoleNames: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private roleService: RoleService,
    private router: Router,
    private toast: ToastService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.dateDdmmyyHhmmss = Constant.DATE_DDMMYY_HHMMSS;
    this.selectedUser = undefined;
    this.page = 1;
    this.size = 20;
    this.formSearch = this.fb.group({
      keyword: [''],
      page: this.page,
      size: this.size,
    });
    this.getUsers();
    this.getRoles();
  }

  openModal(content, user?: User): void {
    this.selectedUser = user;
    this.formUpdate = this.initForm(user);
    this.submitted = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  delete(content, user: User): void {
    this.selectedUser = user;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result && result.trim() === 'ok') {
        this.userService.delete(this.selectedUser.id).subscribe(res => {
          if (res.errorCode === '200') {
            this.getUsers();
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
    if (this.selectedUser) {
      this.userService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getUsers();
          this.toast.showSuccess(res.errorDescription);
          modal.dismiss();
        } else {
          this.toast.showDanger(res.errorDescription);
        }
      });
      return;
    }

    this.userService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getUsers();
        this.toast.showSuccess(res.errorDescription);
        modal.dismiss();
      } else {
        this.toast.showDanger(res.errorDescription);
      }
    });
  }

  initForm(user): FormGroup {
    if (user) {
      this.selectedRoleIds = user.roles.map(({id}) => id);
      this.selectedRoleNames = user.roles.map(({name}) => name).join(', ');
      return this.fb.group({
        id: [user.id, Validators.required],
        username: [user.username, Validators.required],
        password: [null],
        name: [user.name, Validators.required],
        email: [user.email],
        roleIds: ['', Validators.required],
        status: [user.status, Validators.required],
      });
    }
    this.selectedRoleIds = [];
    this.selectedRoleNames = '';
    return this.fb.group({
      id: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
      name: [null, Validators.required],
      email: [null],
      roleIds: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getRoles(): void {
    this.roleService.getActiveRoles().subscribe(res => {
      this.roles = res.data;
    });
  }

  private getUsers(): void {
    this.userService.getUsers(this.formSearch.value).subscribe(res => {
      this.users = res.data.content;
      this.page = res.data.pageable.pageNumber + 1;
      this.size = res.data.pageable.pageSize;
      this.totalItem = res.data.totalElements;
      this.currentItems = res.data.numberOfElements;
    });
  }

  search(event): void {
    event.preventDefault();
    this.getUsers();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.formSearch.controls.page.setValue(this.page);
    this.getUsers();
  }

  toggleRole(event, id: number): void {
    event.preventDefault();
    const index: number = this.selectedRoleIds.findIndex(value => value === id);
    if (index === -1) {
      this.selectedRoleIds.push(id);
    } else {
      console.log('before: ', this.selectedRoleIds);
      this.selectedRoleIds.splice(index, 1);
      console.log('after: ', this.selectedRoleIds);
    }
    const roles: Role[] = this.roles.filter(e => this.selectedRoleIds.includes(e.id));
    console.log('after: ', roles);
    this.selectedRoleNames = roles.map(({name}) => name).join(', ');
    this.formUpdate.controls.roleIds.setValue(this.selectedRoleIds);
  }
}
