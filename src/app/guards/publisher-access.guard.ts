import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class PublisherAccessGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authService.loggedIn() &&
      (this.authService.getUserRole() === 'publisher' ||
        this.authService.getUserRole() === 'admin')
    ) {
      console.log(
        'Inside PublisherAccessGuard ... PublisherAccessGuard Success'
      );
      return true;
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
  }
}
