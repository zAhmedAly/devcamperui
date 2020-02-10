import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  role: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };
    console.log('RegisterComponent onRegisterSubmit newUser = ', newUser);
    // Required Fields
    if (!this.validateService.validateRegister(newUser)) {
      console.log(
        'RegisterComponent onRegisterSubmit validateRegister = ',
        newUser
      );
      this.flashMessage.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(newUser.email)) {
      console.log(
        'RegisterComponent onRegisterSubmit validateEmail = ',
        newUser
      );
      this.flashMessage.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Register user
    this.authService.registerUser(newUser).subscribe(data => {
      console.log(
        'RegisterComponent onRegisterSubmit registerUser data = ',
        data
      );
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
