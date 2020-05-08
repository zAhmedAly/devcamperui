import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Event,
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  returnUrl: string;
  showLoadingIndicator = true;
  private timeoutValue = 15;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute
  ) {
    // Subscribe to the router events observable
    this.router.events.subscribe((routerEvent: Event) => {
      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadisngIndicator to false
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.showLoadingIndicator = false;
      }
    });
  }

  ngOnInit() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    const now = Date.now();

    console.log('Date.now() = ', now);
    console.log('timer =', timer);
    console.log('Date.now() - timer =', (now - timer) / 1000);
    console.log('5 * 60 * 1000 =', this.timeoutValue * 60);

    if (timer && now - timer > this.timeoutValue * 60 * 1000) {
      console.log('Inside AppComponent ... Auto LogOut #1');
      localStorage.setItem('returnUrl', '/');
      console.log(
        'AppComponent ngOnInit this.returnUrl LogOut = ',
        this.returnUrl
      );
      this.authService.logout();

      this.flashMessage.show('Your session has expired', {
        cssClass: 'alert-warning',
        timeout: 10000,
      });
    }
    // else {

    //   this.returnUrl =
    //     this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    //   localStorage.setItem('returnUrl', this.returnUrl);
    // }
    // console.log(
    //   'AppComponent ngOnInit this.returnUrl LogIn = ',
    //   this.returnUrl
    // );
    // this.router.navigateByUrl(this.returnUrl);
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
