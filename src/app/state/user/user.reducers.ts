import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../interface/common.interface';

import * as userActions from './user.actions';

export interface State {
  loading: boolean;
  readOnly: boolean;
  user: User;
}

export const initialState: State = {
  loading: false,
  readOnly: true,
  user: <User>{
    "userId": 1,
    "vendorId": 1,
    "userName": "",
    "password": "",
    "email": "",
    "phone": "",
    "profileId": 1,
    "style": "",
    "attemps": 1,
    "lastVisit": "",
    "createdBy": 1,
    "createdDate": "",
    "modifiedBy": 1,
    "modifiedDate": "",
    "annulled": true,
    "annulledBy": 1,
    "annulledDate": "",
    "accessLevel": 1
  }
};
/* istanbul ignore next */
export const selectIsLoading = state$ => {
  return state$.pipe(select((s: any) => s.currentUser.loading));
};
/* istanbul ignore next */
export const selectUser = state$ => state$.currentUser.user;
/* istanbul ignore next */
export const selectIsReadOnly = state$ => state$.currentUser.readOnly;

export function reducer(
  state = initialState,
  action: userActions.Actions
): State {
  switch (action.type) {
    case userActions.ActionTypes.GET_USER: {
      return Object.assign({}, state, { loading: true, user: null });
    }
    case userActions.ActionTypes.GET_USER_COMPLETE: {
      return Object.assign({}, state, { loading: false, user: action.payload });
    }
    case userActions.ActionTypes.SET_READ_ONLY: {
      return Object.assign({}, state, { readOnly: action.payload });
    }
    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}

/* istanbul ignore next */
export function getUser(state$: Store<any>): Observable<User> {
  return state$.pipe(select(s => s.currentUser.user));
}
