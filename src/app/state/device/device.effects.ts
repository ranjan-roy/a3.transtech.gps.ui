import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DeviceService } from '../../features/device/device.service';

import { BaseEffects } from '../base.effects';

import { ActionTypes, GetDeviceInitAction, GetDeviceFailAction, GetDeviceSuccessAction, GetDevicePositionSuccessAction, GetDevicePositionFailAction } from './device.actions';

@Injectable()
export class DeviceEffects extends BaseEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DeviceService,
    router: Router
  ) {
    super(router);
  }


  @Effect()
  getDevice$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_DEVICE_INIT),
    switchMap((action: GetDeviceInitAction) => {
      console.log(action);

      return this.deviceService.getDeviceByUserId(action.payload).pipe(
        map(
          payload => {
            if (payload) {
              return new GetDeviceSuccessAction(payload)
            } else {
              return new GetDeviceFailAction(payload)
            }
          }

        ),
        catchError(err => this.handleError(err))
      );
    })
  );

  @Effect()
  getDevicePosition$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GET_DEVICE_POSITION_INIT),
    switchMap((action: GetDeviceInitAction) => {
      console.log(action);
      return this.deviceService.getDeviceByUserId(1).pipe(
        map(
          payload => {
            if (payload) {
              return new GetDevicePositionSuccessAction(payload)
            } else {
              return new GetDevicePositionFailAction(payload)
            }
          }

        ),
        catchError(err => this.handleError(err))
      );
    })
  );


}
