import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  sidebarToggled: boolean;

  constructor() {
    this.sidebarToggled = false;
  }

  toggleSidebar(): void {
    this.sidebarToggled = !this.sidebarToggled;
  }
}
