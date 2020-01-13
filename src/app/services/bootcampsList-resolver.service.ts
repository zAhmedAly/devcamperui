import { BootcampsService } from 'app/services/bootcamps.service';
import { Resolve } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class BootcampsListResolverService implements Resolve<[any] | string> {
  // Inject the employeee service as we need it to retrieve employee data
  constructor(private bootscampsService: BootcampsService) {}
  // Resolve interface contains the following one method for which we need to
  // provide implementation. This method calls EmployeeService & returns employee data
  resolve(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<[any] | string> {
    return this.bootscampsService.getBootcamps().pipe(
      delay(1000),
      catchError((err: string) => of(err).pipe(delay(1000)))
    );
  }
}
