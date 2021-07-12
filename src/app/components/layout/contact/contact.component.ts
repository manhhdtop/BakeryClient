import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/shared/constants/constant.class';
import { ContactService } from 'src/app/service/contact.service';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  submitted: boolean;
  formContact: FormGroup;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private toast: ToastService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.submitted = false;
    this.formContact = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(Constant.EMAIL_PATTERN)]],
      phoneNumber: [null, Validators.required],
      content: ['', Validators.required],
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.formContact.invalid) {
      return;
    }
    this.contactService.newContact(this.formContact.value).subscribe(res => {
      if (res.errorCode === '200') {
        this.toast.showSuccess(res.errorDescription);
        this.initForm();
      } else {
        this.translate.get('api_error').subscribe(e => {
          this.toast.showDanger(res.errorDescription ? res.errorDescription : e);
        });
      }
    });
  }
}
