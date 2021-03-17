import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { AlarmService } from "../../services/alarm.service";
import { DeviceService } from "../../services/device.service";

import { BaseEffects } from "../base.effects";

import {
  ActionTypes,
  GetDeviceInitAction,
  GetDeviceFailAction,
  GetDeviceSuccessAction,
  GetaLAlarmTypeInitAction,
  GetaLAlarmTypeFailAction,
  GetaLAlarmTypeSuccessAction,
  GetaLAlarmStatusInitAction,
  GetaLAlarmStatusFailAction,
  GetaLAlarmStatusSuccessAction,
  GetDevicePositionInitAction,
  GetDevicePositionSuccessAction,
  GetDevicePositionFailAction,
} from "./device.actions";

@Injectable()
export class DeviceEffects extends BaseEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService,
    private alarmService: AlarmService,
    router: Router
  ) {
    super(router);
  }

  @Effect()
  getDevice$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_DEVICE_INIT),
    switchMap((action: GetDeviceInitAction) => {
      return this.deviceService.getDeviceByUserId(action.payload).pipe(
        map((payload) => {
          if (payload) {
            return new GetDeviceSuccessAction(payload);
          } else {
            return new GetDeviceFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );

  @Effect()
  getDevicePosition$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_DEVICE_POSITION_INIT),
    switchMap((action: GetDevicePositionInitAction) => {
      return this.deviceService.getDevicePosition().pipe(
        map((payload) => {
          if (payload) {
            return new GetDevicePositionSuccessAction(payload);
          } else {
            return new GetDevicePositionFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );
  @Effect()
  getAllAlarmType$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_ALARM_TYPE_INIT),
    switchMap((action: GetaLAlarmTypeInitAction) => {
      return this.alarmService.getAllAlarmType().pipe(
        map((payload) => {
          if (payload) {
            return new GetaLAlarmTypeSuccessAction(payload);
          } else {
            return new GetaLAlarmTypeFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );

  @Effect()
  getAlarmStatus$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_ALARM_STATUS_INIT),
    switchMap((action: GetaLAlarmStatusInitAction) => {
      return this.alarmService.getAlarmStatus().pipe(
        map((payload) => {
          if (payload) {
            return new GetaLAlarmStatusSuccessAction(payload);
          } else {
            return new GetaLAlarmStatusFailAction(payload);
          }
        }),
        catchError((err) => this.handleError(err))
      );
    })
  );
}
