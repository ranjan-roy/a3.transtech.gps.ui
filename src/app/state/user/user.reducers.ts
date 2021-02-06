import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../../interface/common.interface";

import * as userActions from "./user.actions";

export interface State {
  loading: boolean;
  error: boolean;
  users: User[];
  geofenceByUser: any;
}

export const initialState: State = {
  loading: false,
  error: true,
  users: null,
  geofenceByUser: null,
};

export const selectUser = (state$) => state$.user.users;
export const selectGeofenceByUser = (state$) => state$.user.geofenceByUser;

export function reducer(
  state = initialState,
  action: userActions.UserActions
): State {
  switch (action.type) {
    case userActions.ActionTypes.GET_USER_INIT: {
      return Object.assign({}, state, {
        loading: true,
        users: null,
        error: false,
      });
    }
    case userActions.ActionTypes.GET_USER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        users: action.payload,
        error: false,
      });
    }
    case userActions.ActionTypes.GET_USER_FAIL: {
      return Object.assign({}, state, {
        readOnly: action.payload,
        users: null,
        error: false,
      });
    }
    case userActions.ActionTypes.GET_GEOFENCE_BY_USER_INIT: {
      return Object.assign({}, state, {
        loading: true,
        geofenceByUser: null,
        error: false,
      });
    }
    case userActions.ActionTypes.GET_GEOFENCE_BY_USER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        geofenceByUser: action.payload,
        error: false,
      });
    }
    case userActions.ActionTypes.GET_GEOFENCE_BY_USER_FAIL: {
      return Object.assign({}, state, {
        readOnly: action.payload,
        geofenceByUser: null,
        error: false,
      });
    }
    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
