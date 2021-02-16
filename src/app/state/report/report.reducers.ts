import * as mockReport from "../../mockdata/report.mock";
import * as reportActions from "./report.actions";

export interface State {
  loading: boolean;
  error: boolean;
  vehicleSummary: any[];
  positionData: any[];
}
console.log(mockReport.mockDeviceSummary());

export const initialState: State = {
  loading: false,
  error: true,
  vehicleSummary: null, // mockReport.mockDeviceSummary(),
  positionData: null, //mockReport.mockPositionData(),
};

export const selectVehicleSummary = (state$) => state$.report.vehicleSummary;
export const positionData = (state$) => state$.report.positionData;

export function reducer(
  state = initialState,
  action: reportActions.UserActions
): State {
  switch (action.type) {
    case reportActions.ActionTypes.GET_VEHICLE_SUMMARY_INIT: {
      return Object.assign({}, state, {
        loading: true,
        vehicleSummary: null,
        error: false,
      });
    }
    case reportActions.ActionTypes.GET_VEHICLE_SUMMARY_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        vehicleSummary: action.payload,
        error: false,
      });
    }
    case reportActions.ActionTypes.GET_VEHICLE_SUMMARY_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        vehicleSummary: null,
        error: action.payload,
      });
    }
    case reportActions.ActionTypes.GET_VEHICLE_POSITION_INIT: {
      return Object.assign({}, state, {
        loading: true,
        positionData: null,
        error: false,
      });
    }
    case reportActions.ActionTypes.GET_VEHICLE_POSITION_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        positionData: action.payload,
        error: false,
      });
    }
    case reportActions.ActionTypes.GET_VEHICLE_POSITION_FAIL: {
      return Object.assign({}, state, {
        loading: false,
        positionData: null,
        error: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}
