import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  backHome(event): void {
    event.preventDefault();
    const url = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    if (url && url.trim() !== '' && url.trim().startsWith('/admin')) {
      this.router.navigate(['/admin']);
      return;
    }
    this.router.navigate(['/']);
  }
}
