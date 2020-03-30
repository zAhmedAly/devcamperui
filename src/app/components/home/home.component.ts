import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  miles: string = '50';
  zipcode: string = '01854';
  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/');
  }

  onFindSubmit() {
    this.router.navigate([
      '/bootcamps',
      { zipcode: this.zipcode, miles: this.miles }
    ]);
    // this.router.navigate(['/bootcamps'], {
    //   queryParams: { miles: '50', zipcode: '01854' }
    // });
  }
}
