import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-zipcode-distance',
  templateUrl: './filter-zipcode-distance.component.html',
  styleUrls: ['./filter-zipcode-distance.component.css']
})
export class FilterZipcodeDistanceComponent implements OnInit {
  miles: string = '50';
  zipcode: string = '01854';

  @Output() messageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  sendData() {
    this.messageEvent.emit({ zipcode: this.zipcode, miles: this.miles });
  }

  ngOnInit() {}
}
