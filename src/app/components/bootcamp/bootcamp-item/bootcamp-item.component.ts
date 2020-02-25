import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bootcamp-item',
  templateUrl: './bootcamp-item.component.html',
  styleUrls: ['./bootcamp-item.component.css']
})
export class BootcampItemComponent implements OnInit {
  @Input() bootcamp: any;
  constructor() {}

  ngOnInit() {
    this.bootcamp.averageRating = this.bootcamp.averageRating
      ? this.bootcamp.averageRating.toFixed(1)
      : '';
  }
}
