import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCourses(bootcampId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps/${bootcampId}/courses`)
      .pipe(catchError(this.handleError));
  }

  getCourse(courseId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/courses/${courseId}`)
      .pipe(catchError(this.handleError));
  }

  addCourse(bootcampId: string, newCourse: any): Observable<any | string> {
    const token = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http
      .post(
        `${this.apiUrl}/bootcamps/${bootcampId}/courses`,
        newCourse,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error(
        'ReviewsService Client Side Error :',
        errorResponse.error.message
      );
    } else {
      console.error('ReviewsService Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    // return throwError(errorResponse.error.error);

    return throwError(
      errorResponse.error.error ||
        'Problem with the Courses Service, We are notified & working on it. Please try again later.'
    );
  }
}
