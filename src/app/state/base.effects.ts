import { Router } from "@angular/router";
import { throwError } from "rxjs";

export class BaseEffects {
  constructor(public router: Router) {}

  handleError(errorResponse) {
    // this.router.navigate(['/error', errorResponse.status || 419]);
    return throwError(errorResponse);
  }
}
