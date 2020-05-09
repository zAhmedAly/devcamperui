import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ReviewsService } from 'app/services/reviews.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-upd-review',
  templateUrl: './upd-review.component.html',
  styleUrls: ['./upd-review.component.css'],
})
export class UpdReviewComponent implements OnInit {
  reviewId: string;
  reviews: any;
  bootcampName: string;

  title: string;
  review: string;
  rating: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private reviewsService: ReviewsService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    if (
      this.authService.loggedIn() &&
      (this.authService.getUserRole() === 'user' ||
        this.authService.getUserRole() === 'admin')
    ) {
      this.route.params.subscribe((params) => {
        this.reviewId = params['reviewId'];
        localStorage.setItem('returnUrl', `/upd-review/${this.reviewId}`);
      });
    } else {
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      // this.authService.logout();
      localStorage.setItem('returnUrl', `/profile`);
    }
    const returnUrl = localStorage.getItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }
}
