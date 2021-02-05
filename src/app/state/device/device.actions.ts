import { Action } from '@ngrx/store';

export const ActionTypes = {
  GET_DEVICE_INIT: '[Device] call started',
  GET_DEVICE_SUCCESS: '[Device] data loaded',
  GET_DEVICE_FAIL: '[Device] call  fail',
  GET_DEVICE_POSITION_INIT: '[Device] position call started',
  GET_DEVICE_POSITION_SUCCESS: '[Device] position data loaded',
  GET_DEVICE_POSITION_FAIL: '[Device] position call  fail',
};

export class GetDeviceInitAction implements Action {
  readonly type = ActionTypes.GET_DEVICE_INIT;
  constructor(public payload: any) { }
}


export class GetDeviceSuccessAction implements Action {
  type = ActionTypes.GET_DEVICE_SUCCESS;
  constructor(public payload: any) { }
}


export class GetDeviceFailAction implements Action {
  type = ActionTypes.GET_DEVICE_FAIL;
  constructor(public payload: any) { }
}

export class GetDevicePositionInitAction implements Action {
  readonly type = ActionTypes.GET_DEVICE_POSITION_INIT;
  constructor(public payload: any) { }
}


export class GetDevicePositionSuccessAction implements Action {
  type = ActionTypes.GET_DEVICE_POSITION_SUCCESS;
  constructor(public payload: any) { }
}


export class GetDevicePositionFailAction implements Action {
  type = ActionTypes.GET_DEVICE_POSITION_FAIL;
  constructor(public payload: any) { }
}

export type DeviceActions = GetDeviceInitAction | GetDeviceSuccessAction | GetDeviceFailAction | GetDevicePositionInitAction | GetDevicePositionFailAction | GetDevicePositionFailAction;

