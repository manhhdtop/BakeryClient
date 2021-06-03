import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {

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
