import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_USER_INIT: "[User] call started",
  GET_USER_SUCCESS: "[User] data loaded",
  GET_USER_FAIL: "[User] call  fail",
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

export type UserActions =
  | GetUserInitAction
  | GetUserSuccessAction
  | GetUserFailAction;
