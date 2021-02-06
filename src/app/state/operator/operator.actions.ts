import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_OPERATOR_INIT: "[Operator] call started",
  GET_OPERATOR_SUCCESS: "[Operator] data loaded",
  GET_OPERATOR_FAIL: "[Operator] call  fail",
};

export class GetOperatorInitAction implements Action {
  readonly type = ActionTypes.GET_OPERATOR_INIT;
  constructor(public payload: any) {}
}

export class GetOperatorSuccessAction implements Action {
  type = ActionTypes.GET_OPERATOR_SUCCESS;
  constructor(public payload: any) {}
}

export class GetOperatorFailAction implements Action {
  type = ActionTypes.GET_OPERATOR_FAIL;
  constructor(public payload: any) {}
}

export type OperatorActions =
  | GetOperatorInitAction
  | GetOperatorSuccessAction
  | GetOperatorFailAction;
