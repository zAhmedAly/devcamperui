import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-list-bootcamps',
  templateUrl: './list-bootcamps.component.html',
  styleUrls: ['./list-bootcamps.component.css']
})
export class ListBootcampsComponent implements OnInit {
  bootcamps: [any];
  bootcampsList: [any] | string;
  error: string = null;

  careerList = '';
  showLoadingIndicator = true;

  @Input() miles: string;
  @Input() zipcode: string;

  constructor(
    private _route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    const resolvedData: [any] | string = this._route.snapshot.data[
      'bootcampsList'
    ];

    console.log('resolvedData =', resolvedData);
    console.log('typeof(resolvedData) ', typeof resolvedData);
    if (typeof resolvedData === 'object') {
      console.log('Inside resolvedData');
      this.bootcampsList = resolvedData;
      console.log(
        'BootcampsComponent constructor this.bootcampsList = ',
        this.bootcampsList
      );
    } else {
      this.error = resolvedData;
      console.log('Inside LoginComponent ... ' + this.error);
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
    console.log('onMilesDataChanged Miles =', this.miles);
    console.log('onZipcodeDataChanged Zipcode =', this.zipcode);

    if (this.error === null) {
      localStorage.setItem('returnUrl', '/bootcamps');

      this.bootcamps = this.bootcampsList['data'];

      console.log('this.bootcamps = ', this.bootcamps);

      for (const i in this.bootcamps) {
        if (this.bootcamps.hasOwnProperty(i)) {
          const element = this.bootcamps[i];
          this.bootcamps[i].careerList = '';
          // this.bootcamps[i].averageRating = this.bootcamps[i].averageRating
          //   ? this.bootcamps[i].averageRating.toFixed(1)
          //   : '';
          for (const j in this.bootcamps[i].careers) {
            if (this.bootcamps[i].careers.hasOwnProperty(j)) {
              this.bootcamps[i].careerList +=
                this.bootcamps[i].careers[j] + ', ';
            }
          }
          this.bootcamps[i].careerList = this.bootcamps[i].careerList.replace(
            /,\s*$/,
            ''
          );
        }
      }

      console.log('this.bootcamps = ', this.bootcamps);
    }
  }
}
