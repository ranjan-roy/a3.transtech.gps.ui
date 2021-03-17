import { Action } from "@ngrx/store";

export const ActionTypes = {
  GET_NOTIFICATION_INIT: "[NOTIFICATION] call started",
  GET_NOTIFICATION_SUCCESS: "[NOTIFICATION] data loaded",
  GET_NOTIFICATION_FAIL: "[NOTIFICATION] call  fail",
  GET_NOTIFICATION_APPEND_INIT: "[GET_NOTIFICATION_APPEND] append init",
  GET_NOTIFICATION_APPEND: "[GET_NOTIFICATION_APPEND] append",
};
export class GetNotificationInitAction implements Action {
  readonly type = ActionTypes.GET_NOTIFICATION_INIT;
  constructor(public payload: any) {}
}

export class GetNotificationSuccessAction implements Action {
  type = ActionTypes.GET_NOTIFICATION_SUCCESS;
  constructor(public payload: any) {}
}

export class GetNotificationFailAction implements Action {
  type = ActionTypes.GET_NOTIFICATION_FAIL;
  constructor(public payload: any) {}
}

export class GetNotificationAppendInitAction implements Action {
  readonly type = ActionTypes.GET_NOTIFICATION_APPEND_INIT;
  constructor(public payload: any) {}
}
export class GetNotificationAppendAction implements Action {
  readonly type = ActionTypes.GET_NOTIFICATION_APPEND;
  constructor(public payload: any) {}
}

export type NotificationActions =
  | GetNotificationInitAction
  | GetNotificationSuccessAction
  | GetNotificationFailAction
  | GetNotificationAppendInitAction
  | GetNotificationAppendAction;
