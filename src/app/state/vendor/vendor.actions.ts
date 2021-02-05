import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_VENDOR_INIT: "[Vendor] call started",
  GET_VENDOR_SUCCESS: "[Vendor] data loaded",
  GET_VENDOR_FAIL: "[Vendor] call  fail",
};

export class GetVendorInitAction implements Action {
  readonly type = ActionTypes.GET_VENDOR_INIT;
  constructor(public payload: any) {}
}

export class GetVendorSuccessAction implements Action {
  type = ActionTypes.GET_VENDOR_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVendorFailAction implements Action {
  type = ActionTypes.GET_VENDOR_FAIL;
  constructor(public payload: any) {}
}

export type VendorActions =
  | GetVendorInitAction
  | GetVendorSuccessAction
  | GetVendorFailAction;
