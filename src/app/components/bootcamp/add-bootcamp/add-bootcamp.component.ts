import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-add-bootcamp',
  templateUrl: './add-bootcamp.component.html',
  styleUrls: ['./add-bootcamp.component.css'],
})
export class AddBootcampComponent implements OnInit {
  constructor(
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
    localStorage.setItem('returnUrl', '/add-bootcamp');
  }
}
