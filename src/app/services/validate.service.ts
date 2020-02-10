import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {
  constructor() {}

  validateRegister(user) {
    console.log('ValidateService validateRegister user = ', user);
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.password == undefined ||
      user.role == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
