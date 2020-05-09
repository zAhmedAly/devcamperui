import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-upd-course',
  templateUrl: './upd-course.component.html',
  styleUrls: ['./upd-course.component.css'],
})
export class UpdCourseComponent implements OnInit {
  courseId: string;

  constructor(
    private _route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (
      this.authService.loggedIn() &&
      (this.authService.getUserRole() === 'publisher' ||
        this.authService.getUserRole() === 'admin')
    ) {
      this._route.params.subscribe((params) => {
        this.courseId = params['courseId'];
        localStorage.setItem('returnUrl', `/upd-course/${this.courseId}`);
      });
    } else {
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      // this.authService.logout();
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
