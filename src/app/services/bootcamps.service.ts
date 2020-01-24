import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BootcampsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBootcamps(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps`)
      .pipe(timeout(10000), catchError(this.handleError));
  }

  getBootcamp(bootcampId: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/bootcamps/${bootcampId}`)
      .pipe(timeout(10000), catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error(
        'BootcampsService Client Side Error :',
        errorResponse.error.message
      );
    } else {
      console.error('BootcampsService Server Side Error :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError(
      'Problem with the Bootcamps Service, We are notified & working on it. Please try again later.'
    );
  }
}
