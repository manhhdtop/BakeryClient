import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css'],
})
export class InternalServerErrorComponent implements OnInit {

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
