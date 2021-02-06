import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { GeofencingService } from "../../features/geofencing/geofencing.service";
import { UserService } from "../../features/user/user.service";
import { User } from "../../interface/common.interface";

import { BaseEffects } from "../base.effects";

import * as userActions from "./user.actions";
import {
  GetUserSuccessAction,
  GetUserFailAction,
  GetGeofenceByUserInitAction,
} from "./user.actions";

@Injectable()
export class UserEffects extends BaseEffects {
  @Effect()
  getUser$ = this.actions.pipe(
    ofType(userActions.ActionTypes.GET_USER_INIT),
    switchMap(() =>
      this.userService.getAccessableUsers().pipe(
        map((user: User) => new GetUserSuccessAction(user)),
        catchError((err) => this.handleError(err))
      )
    )
  );

  @Effect()
  geGeofenceByUser$ = this.actions.pipe(
    ofType(userActions.ActionTypes.GET_GEOFENCE_BY_USER_INIT),
    switchMap((action: GetGeofenceByUserInitAction) =>
      this.geofencingService.geGeofenceByUser(action.payload).pipe(
        map(
          (user: User) => new userActions.GetGeofenceByUserSuccessAction(user)
        ),
        catchError((err) => this.handleError(err))
      )
    )
  );

  constructor(
    private actions: Actions,
    private userService: UserService,
    private geofencingService: GeofencingService,
    router: Router
  ) {
    super(router);
  }
}
