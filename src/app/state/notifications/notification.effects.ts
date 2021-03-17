import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { NotificationService } from "../../services/notification.service";

import { BaseEffects } from "../base.effects";

import {
  GetNotificationInitAction,
  GetNotificationFailAction,
  GetNotificationSuccessAction,
  ActionTypes,
  GetNotificationAppendAction,
  GetNotificationAppendInitAction,
} from "./notification.actions";

@Injectable()
export class NotificationEffects extends BaseEffects {
  constructor(
    private actions$: Actions,
    private notificationSvc: NotificationService,
    router: Router
  ) {
    super(router);
  }

  @Effect()
  getNotification$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_NOTIFICATION_INIT),
    switchMap((action: GetNotificationInitAction) => {
      return this.notificationSvc.getNotification().pipe(
        map((res) => {
          if (res) {
            const notifications = res.sort(
              (d1, d2) =>
                new Date(d2.timeStamp).getTime() -
                new Date(d1.timeStamp).getTime()
            );
            return new GetNotificationSuccessAction(notifications);
          } else {
            return new GetNotificationFailAction(res);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );
}
