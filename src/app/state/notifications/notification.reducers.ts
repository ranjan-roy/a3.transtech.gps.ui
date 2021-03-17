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
  console.log(action);

  switch (action.type) {
    case ActionTypes.GET_NOTIFICATION_INIT: {
      return Object.assign({}, state, {
        loading: true,
        notifications: null,
        error: null,
      });
    }
    case ActionTypes.GET_NOTIFICATION_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        notifications: action.payload,
        error: false,
      });
    }
    case ActionTypes.GET_NOTIFICATION_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        notifications: null,
        error: true,
      });
    }
    case ActionTypes.GET_NOTIFICATION_APPEND: {
      console.log(action);
      let notifications = state.notifications;
      notifications.unshift(action.payload);
      return Object.assign({}, state, {
        loading: false,
        notifications: notifications,
        error: true,
      });
    }
    default: {
      return state;
    }
  }
}
