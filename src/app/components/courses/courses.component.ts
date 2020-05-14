import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @Input() bootcamp: any;
  bootcampId: string;
  courses: any;
  coursesList: [any] | string;
  bootcampName: string;
  averageRating: number;
  photo: string;
  state: string;
  city: string;
  zipcode: string;
  careers: string[];
  count: number;

  loggedInUserId: string;

  courseEnabled: boolean = true;
  error: string = null;
  careerList: string;

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    console.log('CoursesComponent constructor =====');

    this.activatedroute.queryParams.subscribe((data) => {
      console.log('DATA ====> ', data);
    });

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
        timeout: 5000,
      });
      //this.router.navigate(['/']);
      const returnUrlx = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(returnUrlx);
    }
  }

  ngOnInit() {
    if (
      this.authService.loggedIn() &&
      (this.authService.getUserRole() === 'publisher' ||
        this.authService.getUserRole() === 'admin')
    ) {
      console.log(
        'Inside PublisherAccessGuard ... PublisherAccessGuard Success'
      );
    } else {
      console.log('Inside PublisherAccessGuard ... Not Authorized');
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      // this.authService.logout();
      this.router.navigate(['/profile']);
      return false;
    }

    if (this.error === null) {
      this._route.params.subscribe((params) => {
        console.log('CoursesComponent ngOnInit route.params ', params);
        this.bootcampId = params['bootcampId'];
        localStorage.setItem('returnUrl', `/manage-courses/${this.bootcampId}`);
      });

      this.bootcampName = this.coursesList['bootcampName'];
      this.averageRating = this.coursesList['averageRating']
        ? this.coursesList['averageRating'].toFixed(1)
        : '';
      this.photo = this.coursesList['photo'];
      this.state = this.coursesList['state'];
      this.city = this.coursesList['city'];
      this.zipcode = this.coursesList['zipcode'].substring(0, 5);
      this.careers = this.coursesList['careers'];
      this.count = +this.coursesList['count'];
      this.careerList = '';
      for (const j in this.careers) {
        if (this.careers.hasOwnProperty(j)) {
          this.careerList += this.careers[j] + ', ';
        }
      }
      this.careerList = this.careerList.replace(/,\s*$/, '');

      this.courses = this.coursesList['data'];
      console.log('CoursesComponent getcourses this.courses = ', this.courses);
      const userInfo =
        JSON.parse(this.authService.loadUserInfo()) || 'No user data';
      this.loggedInUserId = userInfo.id;
      this.courses.forEach((course) => {
        if (course.user._id === userInfo.id) {
          this.courseEnabled = false;
        }
      });
    }
  }
}
