import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bootcamp-item',
  templateUrl: './bootcamp-item.component.html',
  styleUrls: ['./bootcamp-item.component.css']
})
export class BootcampItemComponent implements OnInit {
  @Input() bootcamp: any;
  zipcode: string;
  constructor() {}

  ngOnInit() {
    this.bootcamp.averageRating = this.bootcamp.averageRating
      ? this.bootcamp.averageRating.toFixed(1)
      : '';
    this.zipcode = this.bootcamp.location.zipcode.substring(0, 5);
  }
}
