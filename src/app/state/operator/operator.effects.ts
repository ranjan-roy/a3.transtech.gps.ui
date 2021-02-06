import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { AlarmService } from "../../features/alarm/alarm.service";

import { BaseEffects } from "../base.effects";

import {
  ActionTypes,
  GetOperatorInitAction,
  GetOperatorFailAction,
  GetOperatorSuccessAction,
} from "./operator.actions";

@Injectable()
export class OperatorEffects extends BaseEffects {
  constructor(
    private actions$: Actions,
    private operatorService: AlarmService,
    router: Router
  ) {
    super(router);
  }

  @Effect()
  getOperator$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_OPERATOR_INIT),
    switchMap((action: GetOperatorInitAction) => {
      console.log(action);
      return this.operatorService.getOperator().pipe(
        map((payload) => {
          if (payload) {
            return new GetOperatorSuccessAction(payload);
          } else {
            return new GetOperatorFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );
}
