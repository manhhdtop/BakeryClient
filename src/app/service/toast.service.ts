import { Injectable, TemplateRef } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {
  static DELAY = 7000;
  static SUCCESS_CONFIG = {classname: 'bg-success text-light shadow', delay: ToastService.DELAY};
  static DANGER_CONFIG = {classname: 'bg-danger  text-light', delay: ToastService.DELAY};
  toasts: any[] = [];

  show(text: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({text, ...options});
  }

  showSuccess(text: string | TemplateRef<any>): void {
    this.toasts.push({text, ...ToastService.SUCCESS_CONFIG});
  }

  showDanger(text: string | TemplateRef<any>): void {
    this.toasts.push({text, ...ToastService.DANGER_CONFIG});
  }

  remove(toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
