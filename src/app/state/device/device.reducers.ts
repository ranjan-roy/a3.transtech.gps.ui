import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceActions, ActionTypes } from './device.actions';

export interface State {
  loading: boolean;
  device: any;
  devicePositions: any,
  loadDeviceError: boolean;
  loadDevicePosError: boolean;
}

export const initialState: State = {
  loading: false,
  device: null,
  devicePositions: null,
  loadDeviceError: false,
  loadDevicePosError: false
};
/* istanbul ignore next */
export const selectIsLoading = state$ => {
  return state$.pipe(select((s: any) => s.loading));
};
/* istanbul ignore next */
export const selectDevice = state$ => state$.device;

/* istanbul ignore next */

export function reducer(
  state = initialState,
  action: DeviceActions
): State {
  switch (action.type) {
    case ActionTypes.GET_DEVICE_INIT: {
      return Object.assign({}, state, { loading: true, device: null, loadDeviceError: null });
    }
    case ActionTypes.GET_DEVICE_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, { loading: false, device: action.payload, loadDeviceError: false });
    }
    case ActionTypes.GET_DEVICE_FAIL: {
      console.log(action);
      return Object.assign({}, state, { loading: false, device: null, loadDeviceError: true });
    }
    // Device Position
    case ActionTypes.GET_DEVICE_POSITION_INIT: {
      return Object.assign({}, state, { loading: true, devicePositions: null, loadDevicePosError: null });
    }
    case ActionTypes.GET_DEVICE_POSITION_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, { loading: false, devicePositions: action.payload, loadDevicePosError: false });
    }
    case ActionTypes.GET_DEVICE_POSITION_FAIL: {
      console.log(action);
      return Object.assign({}, state, { loading: false, devicePositions: null, loadDevicePosError: true });
    }
    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
