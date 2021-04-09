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
    if (this.selectedUser) {
      this.userService.update(this.formUpdate.value).subscribe(res => {
        if (res.errorCode === '200') {
          this.getUsers();
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

    this.userService.save(this.formUpdate.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.getUsers();
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

  initForm(user): FormGroup {
    if (user) {
      return this.fb.group({
        id: [user.id, Validators.required],
        username: [user.username, Validators.required],
        password: [null],
        name: [user.name, Validators.required],
        email: [user.email],
        roleId: [user.role?.id],
        status: [user.status, Validators.required],
      });
    }
    return this.fb.group({
      id: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
      name: [null, Validators.required],
      email: [null],
      roleId: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getRoles(): void {
    this.roleService.getActiveRoles().subscribe(res => {
      this.roles = res.data;
    }, error => {
      this.toast.showDanger(error.error.message);
    });
  }

  private getUsers(): void {
    this.userService.getUsers(this.formSearch.value).subscribe(res => {
      this.users = res.data.content;
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
    this.getUsers();
  }

  getStatusName(status: number): string {
    return Utils.getStatusName(status);
  }

  onPageChange(): void {
    this.toast.show('' + this.page);
    this.formSearch.controls.page.setValue(this.page);
    this.getUsers();
  }
}
