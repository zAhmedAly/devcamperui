import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-manage-bootcamp',
  templateUrl: './manage-bootcamp.component.html',
  styleUrls: ['./manage-bootcamp.component.css'],
})
export class ManageBootcampComponent implements OnInit {
  style = 'mapbox://styles/mapbox/streets-v11';
  lng: number = -71.104028;
  lat: number = 42.350846;
  bootcampId: string = null;
  bootcamp: any;
  bootcampData: any;
  bootcampCourses: any;
  bootcampReviews: any;
  bootcampReviewCount: any;

  avgCourseCostText = 'Average Course Cost: ';

  bootcampName: string = null;
  bootcampDesc: string = null;
  city: string;
  state: string;
  averageCost: number = null;
  averageRating: any;
  housing: boolean = false;
  jobAssistance: boolean = false;
  jobGuarantee: boolean = false;
  acceptGi: boolean = false;
  slug: string = null;

  isLoading: boolean = false;

  reviewEnabled: boolean = true;
  error: string = null;

  constructor(
    private _route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) {
    const resolvedData: [any] | string = this._route.snapshot.data['bootcamp'];

    console.log('ManageBootcampComponent resolvedData =', resolvedData);
    console.log(
      'ManageBootcampComponent typeof(resolvedData) ',
      typeof resolvedData
    );
    if (typeof resolvedData === 'object') {
      console.log('Inside resolvedData');
      this.bootcampData = resolvedData;
      console.log(
        'ManageBootcampComponent constructor this.bootcampsList = ',
        this.bootcampData
      );
    } else {
      this.error = resolvedData;
      console.log('Inside LoginComponent ... ' + this.error);
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
        timeout: 5000,
      });
      // this.authService.logout();
      this.router.navigate(['/profile']);
      return false;
    }

    if (this.error === null) {
      var slug = '';
      this._route.params.subscribe((params) => {
        this.bootcampId = params['bootcampId'];
        localStorage.setItem(
          'returnUrl',
          `/manage-bootcamp/${this.bootcampId}`
        );
      });

      this.bootcamp = this.bootcampData['data'];

      const averageRating = Number(this.bootcamp.averageRating)
        ? Number(this.bootcamp.averageRating).toFixed(1)
        : 0;

      this.averageRating = averageRating;

      console.log('ManageBootcampComponent this.bootcamp = ', this.bootcamp);

      this.bootcampName = this.bootcamp.name;
      this.bootcampDesc = this.bootcamp.description;
      this.city = this.bootcamp.location.city;
      this.state = this.bootcamp.location.state;
      this.averageCost = this.bootcamp.averageCost;
      this.housing = this.bootcamp.housing;
      this.jobAssistance = this.bootcamp.jobAssistance;
      this.jobGuarantee = this.bootcamp.jobGuarantee;
      this.acceptGi = this.bootcamp.acceptGi;
      slug = this.bootcamp.slug;

      this.bootcampCourses = this.bootcamp.courses;
      this.bootcampReviewCount = this.bootcamp.reviewCount;
      this.bootcampReviews = this.bootcamp.reviews;

      const userInfo =
        JSON.parse(this.authService.loadUserInfo()) || 'No user data';

      this.bootcampReviews.forEach((review) => {
        if (review.user === userInfo.id) {
          this.reviewEnabled = false;
        }
      });
      this.bootcamp.careerList = '';

      for (const j in this.bootcamp.careers) {
        if (this.bootcamp.careers.hasOwnProperty(j)) {
          this.bootcamp.careerList += this.bootcamp.careers[j] + ', ';
        }
      }
      this.bootcamp.careerList = this.bootcamp.careerList.replace(/,\s*$/, '');

      console.log(
        'ManageBootcampComponent this.bootcamp.careerList = ',
        this.bootcamp.careerList
      );

      console.log(
        'ManageBootcampComponent this.bootcampCourses = ',
        this.bootcampCourses
      );

      console.log(
        'ManageBootcampComponent this.bootcampReviewCount = ',
        this.bootcampReviewCount
      );

      console.log(
        'ManageBootcampComponent this.bootcampReviews = ',
        this.bootcampReviews
      );
    }
  }
}
