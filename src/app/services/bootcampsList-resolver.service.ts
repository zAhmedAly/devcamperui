import { BootcampsService } from 'app/services/bootcamps.service';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class BootcampsListResolverService implements Resolve<[any] | string> {
  private miles: string = null;
  private zipcode: string = null;

  // Inject the employeee service as we need it to retrieve employee data
  constructor(
    private bootscampsService: BootcampsService,
    private route: ActivatedRoute
  ) {}
  // Resolve interface contains the following one method for which we need to
  // provide implementation. This method calls EmployeeService & returns employee data
  resolve(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<[any] | string> {
    this.route.queryParamMap.subscribe(queryParams => {
      console.log('queryParams values = ', queryParams);
      this.miles = queryParams.get('miles');
      this.zipcode = queryParams.get('zipcode');
    });

    console.log('BootcampsListResolverService MILES = ', this.miles);
    console.log('BootcampsListResolverService ZIPCODE = ', this.zipcode);

    return this.bootscampsService.getBootcamps(this.miles, this.zipcode).pipe(
      delay(1000),
      catchError((err: string) => of(err).pipe(delay(1000)))
    );
  }
}
