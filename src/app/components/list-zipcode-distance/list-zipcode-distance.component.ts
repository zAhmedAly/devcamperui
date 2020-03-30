import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-zipcode-distance',
  templateUrl: './list-zipcode-distance.component.html',
  styleUrls: ['./list-zipcode-distance.component.css']
})
export class ListZipcodeDistanceComponent implements OnInit {
  miles: string = '50';
  zipcode: string = '01854';

  constructor(private router: Router) {}

  sendData() {
    console.log(
      'XXXX ListZipcodeDistanceComponent sendData ZIPCODE = ',
      this.zipcode
    );
    console.log(
      'XXXX ListZipcodeDistanceComponent sendData MILES = ',
      this.miles
    );

    this.router.navigate(['/bootcamps', this.zipcode, this.miles]);
  }

  ngOnInit() {}
}
