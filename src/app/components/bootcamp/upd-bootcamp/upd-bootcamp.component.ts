import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-upd-bootcamp',
  templateUrl: './upd-bootcamp.component.html',
  styleUrls: ['./upd-bootcamp.component.css'],
})
export class UpdBootcampComponent implements OnInit {
  bootcampId: string;

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
        this.bootcampId = params['bootcampId'];
        localStorage.setItem('returnUrl', `/upd-bootcamp/${this.bootcampId}`);
      });
    } else {
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
