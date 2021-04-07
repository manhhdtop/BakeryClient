import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../service/auth.service';
import { ToastService } from '../../../service/toast.service';
import { Constant } from '../../../shared/constants/constant.class';
import { UrlConstant } from '../../../shared/constants/url.class';
import { Utils } from '../../../shared/util/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messageError: string;
  returnUrl: string;
  submitted: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || UrlConstant.ADMIN;
    console.log(AuthService.isLoggedIn());
    if (AuthService.isLoggedIn()) {
      this.authService.checkToken().subscribe(res => {
        const token = res.token;
        const user = JSON.stringify(res.user);
        localStorage.setItem(Constant.TOKEN, token);
        localStorage.setItem(Constant.USER_INFO, user);
        this.router.navigate([this.returnUrl]);
      }, error => {
      });
    }
    this.loginForm = this.createForm();
    this.submitted = false;
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.title.setTitle(e);
    });
  }

  submitForm(event): void {
    event.preventDefault();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(res => {
      const token = res.token;
      const user = JSON.stringify(res.user);
      localStorage.setItem(Constant.TOKEN, token);
      localStorage.setItem(Constant.USER_INFO, user);
      this.router.navigate([this.returnUrl]);
    }, error => {
      console.log('error', error);
      this.messageError = error.error.message;
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
