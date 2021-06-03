import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  backHome(event): void {
    event.preventDefault();
    const url = this.router.url;
    if (url && url.trim() !== '' && url.trim().startsWith('/admin')) {
      this.router.navigate(['/admin']);
      return;
    }
    this.router.navigate(['/']);
  }
}
