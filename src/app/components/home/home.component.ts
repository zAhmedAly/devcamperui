import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/');
  }

  onFindSubmit() {
    this.router.navigate(['/bootcamps'], {
      queryParams: { miles: '50', zipcode: '01854' }
    });
  }
}
