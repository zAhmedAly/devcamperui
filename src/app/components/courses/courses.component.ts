import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  bootcampId: string;
  courses: any;
  coursesList: [any] | string;
  bootcampName: string;
  averageRating: number;
  photo: string;
  loggedInUserId: string;

  courseEnabled: boolean = true;
  error: string = null;

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    console.log('CoursesComponent constructor =====');

    const resolvedData: [any] | string = this._route.snapshot.data['courses'];

    console.log('CoursesComponent resolvedData =', resolvedData);
    console.log('CoursesComponent typeof(resolvedData) ', typeof resolvedData);
    if (typeof resolvedData === 'object') {
      console.log('Inside CoursesComponent resolvedData ');
      this.coursesList = resolvedData;
      console.log(
        'CoursesComponent constructor this.coursesList = ',
        this.coursesList
      );
    } else {
      console.log(
        'CoursesComponent typeof(resolvedData) ',
        typeof resolvedData
      );

      this.error = resolvedData;
      console.log('Inside CoursesComponent ERROR ... ' + this.error);
      this.flashMessage.show(this.error, {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      //this.router.navigate(['/']);
      const returnUrlx = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(returnUrlx);
    }
  }

  ngOnInit() {
    if (this.error === null) {
      this._route.params.subscribe(params => {
        console.log('CoursesComponent ngOnInit route.params ', params);
        this.bootcampId = params['bootcampId'];
        localStorage.setItem('returnUrl', `/manage-courses/${this.bootcampId}`);
      });

      this.bootcampName = this.coursesList['bootcampName'];
      this.averageRating = this.coursesList['averageRating']
        ? this.coursesList['averageRating'].toFixed(1)
        : '';
      this.photo = this.coursesList['photo'];
      this.courses = this.coursesList['data'];
      console.log('CoursesComponent getcourses this.courses = ', this.courses);
      const userInfo =
        JSON.parse(this.authService.loadUserInfo()) || 'No user data';
      this.loggedInUserId = userInfo.id;
      this.courses.forEach(course => {
        if (course.user._id === userInfo.id) {
          this.courseEnabled = false;
        }
      });
    }
  }
}
