import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authService.loggedIn() &&
      (this.authService.getUserRole() === 'user' ||
        this.authService.getUserRole() === 'admin')
    ) {
      console.log('Inside UserAccessGuard ... UserAccessGuard Success');
      return true;
    } else {
      console.log('Inside UserAccessGuard ... Not Authorized');
      this.flashMessage.show('Not Authorized to access this page', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      // this.authService.logout();
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
