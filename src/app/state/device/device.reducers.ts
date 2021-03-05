import { select } from "@ngrx/store";
import { DeviceActions, ActionTypes } from "./device.actions";

export interface State {
  loading: boolean;
  device: any;
  devicePositions: any;
  loadDeviceError: boolean;
  loadDevicePosError: boolean;
  alarmTypes: any;
  loadAlarmTypeError: boolean;
  alarmStatus: any;
  loadAlarmStatusError: boolean;
}

export const initialState: State = {
  loading: false,
  device: null,
  alarmTypes: null,
  devicePositions: null,
  loadDeviceError: false,
  loadDevicePosError: false,
  loadAlarmTypeError: false,
  alarmStatus: null,
  loadAlarmStatusError: false,
};
export const selectIsLoading = (state$) => {
  return state$.pipe(select((s: any) => s.loading));
};
export const selectDevice = (state$) => state$.device;
export const selectAlarmTypes = (state$) => state$.device.alarmTypes;
export const selectAlarmStatus = (state$) => state$.device.alarmStatus;

export function reducer(state = initialState, action: DeviceActions): State {
  switch (action.type) {
    case ActionTypes.GET_DEVICE_INIT: {
      return Object.assign({}, state, {
        loading: true,
        device: null,
        loadDeviceError: null,
      });
    }
    case ActionTypes.GET_DEVICE_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        device: action.payload,
        loadDeviceError: false,
      });
    }
    case ActionTypes.GET_DEVICE_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        device: null,
        loadDeviceError: true,
      });
    }
    // Device Position
    case ActionTypes.GET_DEVICE_POSITION_INIT: {
      return Object.assign({}, state, {
        loading: true,
        devicePositions: null,
        loadDevicePosError: null,
      });
    }
    case ActionTypes.GET_DEVICE_POSITION_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        devicePositions: action.payload,
        loadDevicePosError: false,
      });
    }
    case ActionTypes.GET_DEVICE_POSITION_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        devicePositions: null,
        loadDevicePosError: true,
      });
    }
    // Alrm Type
    case ActionTypes.GET_ALARM_TYPE_INIT: {
      return Object.assign({}, state, {
        loading: true,
        alarmTypes: null,
        loadAlarmTypeError: null,
      });
    }
    case ActionTypes.GET_ALARM_TYPE_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        alarmTypes: action.payload,
        loadAlarmTypeError: false,
      });
    }
    case ActionTypes.GET_ALARM_TYPE_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        alarmTypes: null,
        loadAlarmTypeError: true,
      });
    }
    // Alarm Status
    case ActionTypes.GET_ALARM_STATUS_INIT: {
      return Object.assign({}, state, {
        loading: true,
        alarmStatus: null,
        loadAlarmStatusError: null,
      });
    }
    case ActionTypes.GET_ALARM_STATUS_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        alarmStatus: action.payload,
        loadAlarmStatusError: false,
      });
    }
    case ActionTypes.GET_ALARM_STATUS_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        alarmStatus: null,
        loadAlarmStatusError: true,
      });
    }
    default: {
      return state;
    }
  }
}
