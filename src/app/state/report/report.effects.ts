import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";

import { BaseEffects } from "../base.effects";
import * as reportActions from "./report.actions";

import {
  GetVehicleSummaryInitAction,
  GetVehicleSummarySuccessAction,
} from "./report.actions";
import { PositionService } from "../../services/position.service";

@Injectable()
export class ReportEffects extends BaseEffects {
  constructor(
    private actions: Actions,
    private positionService: PositionService,
    router: Router
  ) {
    super(router);
  }

  @Effect()
  getVehicleSummary$ = this.actions.pipe(
    ofType(reportActions.ActionTypes.GET_VEHICLE_SUMMARY_INIT),
    switchMap((action: GetVehicleSummaryInitAction) =>
      this.positionService.getVehicleSummary(action.payload).pipe(
        map((response: any) => new GetVehicleSummarySuccessAction(response)),
        catchError((err) => this.handleError(err))
      )
    )
  );

  @Effect()
  getPositionData$ = this.actions.pipe(
    ofType(reportActions.ActionTypes.GET_VEHICLE_POSITION_INIT),
    switchMap((action: reportActions.GetVehiclePositionInitAction) =>
      this.positionService.getPositionData(action.payload).pipe(
        map(
          (response: any) =>
            new reportActions.GetVehiclePositionSuccessAction(response)
        ),
        catchError((err) => this.handleError(err))
      )
    )
  );
}
