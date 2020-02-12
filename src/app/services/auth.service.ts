import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from 'app/interfaces/auth-data';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authToken: string = null;
  user: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    // this.isDev = true;  // Change to false before deployment
  }

  registerUser(newUser) {
    return this.http
      .post<AuthData>(`${this.apiUrl}/auth/register`, newUser)
      .pipe(catchError(this.handleError));
  }

  authenticateUser(user) {
    return this.http
      .post<AuthData>(`${this.apiUrl}/auth/login`, user)
      .pipe(catchError(this.handleError));
  }

  getProfile(userId: String) {
    const token = this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http
      .get<AuthData>(`${this.apiUrl}/users/${userId}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return this.authToken;
  }

  loadUserInfo() {
    const user = localStorage.getItem('user');
    this.user = user;
    return this.user;
  }

  getUserRole() {
    const loggedInUser = JSON.parse(this.loadUserInfo());
    return loggedInUser.role;
  }

  getUserName() {
    const loggedInUser = JSON.parse(this.loadUserInfo());
    return loggedInUser.name;
  }

  loggedIn() {
    this.loadToken();
    // console.log('AuthService loggedIn this.authToken ', this.authToken);
    // console.log('decodeToken = ', this.jwtHelper.decodeToken(this.authToken));
    // console.log(
    //   'getTokenExpirationDate = ',
    //   this.jwtHelper.getTokenExpirationDate(this.authToken)
    // );
    // console.log(
    //   'isTokenExpired = ',
    //   this.jwtHelper.isTokenExpired(this.authToken)
    // );

    return (
      !this.authToken != null && !this.jwtHelper.isTokenExpired(this.authToken)
    );
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error(
        'AuthService Client Side Error :',
        errorResponse.error.message
      );
    } else {
      console.error('AuthService Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    // return throwError(errorResponse.error.error);

    return throwError(
      'Problem with the Auth Service, We are notified & working on it. Please try again later.'
    );
  }
}
