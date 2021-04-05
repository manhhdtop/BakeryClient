import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [header]="toast.headertext"
      [class]="toast.classname"
      [autohide]="toast.autohide || true"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)">
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.text"></ng-template>
      </ng-template>
      <ng-template #text>{{ toast.text }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'},
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
  }

  isTemplate(toast): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
