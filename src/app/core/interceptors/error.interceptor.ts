import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from "../service/notification.server";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(protected _notificationSvc: NotificationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([400, 401, 403, 500].indexOf(err.status) !== -1) {
          if (err.error.message) {
            this._notificationSvc.error("Error", err.error.message);
          } else if (err.error) {
            this._notificationSvc.error("Error", err.error);
          }
          else {
            this._notificationSvc.error("Error", "Something went wrong");
          }
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
