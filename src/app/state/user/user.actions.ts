import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_USER_INIT: "[getAccessableUsers] call started",
  GET_USER_SUCCESS: "[getAccessableUsers] data loaded",
  GET_USER_FAIL: "[getAccessableUsers] call  fail",
  GET_GEOFENCE_BY_USER_INIT: "[geGeofenceByUser] call started",
  GET_GEOFENCE_BY_USER_SUCCESS: "[geGeofenceByUser] data loaded",
  GET_GEOFENCE_BY_USER_FAIL: "[geGeofenceByUser] call  fail",
};

export class GetUserInitAction implements Action {
  readonly type = ActionTypes.GET_USER_INIT;
  constructor(public payload: any) {}
}

export class GetUserSuccessAction implements Action {
  type = ActionTypes.GET_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetUserFailAction implements Action {
  type = ActionTypes.GET_USER_FAIL;
  constructor(public payload: any) {}
}
export class GetGeofenceByUserInitAction implements Action {
  readonly type = ActionTypes.GET_GEOFENCE_BY_USER_INIT;
  constructor(public payload: any) {}
}

export class GetGeofenceByUserSuccessAction implements Action {
  type = ActionTypes.GET_GEOFENCE_BY_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetGeofenceByUserFailAction implements Action {
  type = ActionTypes.GET_GEOFENCE_BY_USER_FAIL;
  constructor(public payload: any) {}
}
export type UserActions =
  | GetUserInitAction
  | GetUserSuccessAction
  | GetUserFailAction
  | GetGeofenceByUserInitAction
  | GetGeofenceByUserSuccessAction
  | GetGeofenceByUserFailAction;
