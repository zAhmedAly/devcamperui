import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from 'app/services/reviews.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  bootcampId: string;
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
      this.route.params.subscribe(params => {
        this.bootcampId = params['bootcampId'];
        localStorage.setItem('returnUrl', `/add-review/${this.bootcampId}`);
      });
    } else {
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      // this.authService.logout();
      localStorage.setItem('returnUrl', `/profile`);
    }
    const returnUrl = localStorage.getItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }

  onReviewSubmit() {
    const userInfo = JSON.parse(this.authService.loadUserInfo());

    const newReview = {
      title: this.title,
      text: this.review,
      rating: this.rating,
      bootcamp: this.bootcampId,
      user: userInfo.id
    };

    console.log('AddReviewComponent newReview =', newReview);
    this.reviewsService
      .addReview(this.bootcampId, newReview)
      .subscribe(result => {
        console.log('AddReviewComponent addReview RESULT= ', result);

        if (typeof result === 'object') {
          console.log('AddReviewComponent addReview = ', result);
          // if (result.success) {
          this.bootcampName = result.bootcampName;
          this.reviews = result.data;
          console.log(
            'AddReviewComponent addReview this.reviews = ',
            this.reviews
          );
        } else {
          console.log('ReviewsComponent typeof(resolvedData) ', typeof result);
          console.log('Inside ReviewsComponent ERROR ... ', result);
          this.flashMessage.show(result, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
  }
}
