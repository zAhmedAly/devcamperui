import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() course: any;
  @Input() index: string;
  @Input() showEditDelete: boolean = false;

  constructor() {}

  ngOnInit() {}
}
