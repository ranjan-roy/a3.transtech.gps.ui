import { Action } from '@ngrx/store';
import { User } from '../../interface/common.interface';

export const ActionTypes = {
  GET_USER: '[User] Getting data',
  GET_USER_COMPLETE: '[User] data loaded',
  SET_READ_ONLY: '[User] setting readOnly property'
};

export class GetUserAction implements Action {
  type = ActionTypes.GET_USER;

  constructor(public payload?: any) { }
}

export class GetUserCompleteAction implements Action {
  type = ActionTypes.GET_USER_COMPLETE;

  constructor(public payload: User) { }
}

export class SetReadOnlyAction implements Action {
  type = ActionTypes.SET_READ_ONLY;

  constructor(public payload: boolean) { }
}

export type Actions = GetUserAction | GetUserCompleteAction | SetReadOnlyAction;
