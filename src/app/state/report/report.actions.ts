import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_VEHICLE_SUMMARY_INIT: "[getVehicleSummary] call started",
  GET_VEHICLE_SUMMARY_SUCCESS: "[getVehicleSummary] data loaded",
  GET_VEHICLE_SUMMARY_FAIL: "[getVehicleSummary] call  fail",
  GET_VEHICLE_POSITION_INIT: "[getVehiclePosition] call started",
  GET_VEHICLE_POSITION_SUCCESS: "[getVehiclePosition] data loaded",
  GET_VEHICLE_POSITION_FAIL: "[getVehiclePosition] call  fail",
};

export class GetVehicleSummaryInitAction implements Action {
  readonly type = ActionTypes.GET_VEHICLE_SUMMARY_INIT;
  constructor(public payload: any) {}
}

export class GetVehicleSummarySuccessAction implements Action {
  type = ActionTypes.GET_VEHICLE_SUMMARY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVehicleSummaryFailAction implements Action {
  type = ActionTypes.GET_VEHICLE_SUMMARY_FAIL;
  constructor(public payload: any) {}
}

export class GetVehiclePositionInitAction implements Action {
  readonly type = ActionTypes.GET_VEHICLE_POSITION_INIT;
  constructor(public payload: any) {}
}

export class GetVehiclePositionSuccessAction implements Action {
  type = ActionTypes.GET_VEHICLE_POSITION_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVehiclePositionFailAction implements Action {
  type = ActionTypes.GET_VEHICLE_POSITION_FAIL;
  constructor(public payload: any) {}
}

export type UserActions =
  | GetVehicleSummaryInitAction
  | GetVehicleSummarySuccessAction
  | GetVehicleSummaryFailAction
  | GetVehiclePositionInitAction
  | GetVehiclePositionSuccessAction
  | GetVehiclePositionFailAction;
