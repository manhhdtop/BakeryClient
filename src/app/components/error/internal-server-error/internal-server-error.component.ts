import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  constructor(private routerLink: Router) {
  }

  ngOnInit(): void {
  }
}
