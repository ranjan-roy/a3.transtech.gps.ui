import { select } from "@ngrx/store";
import { ActionTypes, NotificationActions } from "./notification.actions";

export interface State {
  loading: boolean;
  notifications: any;
  error: boolean;
}

export const initialState: State = {
  loading: false,
  notifications: null,
  error: false,
};
export const selectIsLoading = (state$) => {
  return state$.pipe(select((s: any) => s.loading));
};
export const selectNotifications = (state$) =>
  state$.notification.notifications;

export function reducer(
  state = initialState,
  action: NotificationActions
): State {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATION_INIT: {
      return Object.assign({}, state, {
        loading: true,
        notifications: null,
        error: null,
      });
    }
    case ActionTypes.GET_NOTIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        notifications: action.payload,
        error: false,
      });
    }
    case ActionTypes.GET_NOTIFICATION_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        notifications: null,
        error: true,
      });
    }
    case ActionTypes.GET_NOTIFICATION_APPEND: {
      let notifications = [action.payload, ...state.notifications];
      return Object.assign({}, state, {
        loading: false,
        notifications: notifications,
        error: false,
      });
    }
    default: {
      return state;
    }
  }
}
