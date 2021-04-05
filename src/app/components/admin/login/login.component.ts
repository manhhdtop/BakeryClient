import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../service/toast.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../../shared/util/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  messageError: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private title: Title,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    this.translate.get(Utils.getPageTitle(this.activeRoute)).subscribe(e => {
      this.title.setTitle(e);
    });
  }

  submitForm(event): void {
    event.preventDefault();
    console.log('Do login');
    this.toast.showSuccess('Do login. Do login. Do login. Do login. Do login. Do login. Do login. Do login. Do login. Do login. ');
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
