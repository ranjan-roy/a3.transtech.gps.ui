import { Store, select } from "@ngrx/store";
import { VendorActions, ActionTypes } from "./vendor.actions";

export interface State {
  loading: boolean;
  vendors: any;
  loadVendorError: boolean;
}

export const initialState: State = {
  loading: false,
  vendors: null,
  loadVendorError: false,
};
/* istanbul ignore next */
export const selectIsLoading = (state$) => {
  return state$.pipe(select((s: any) => s.loading));
};
/* istanbul ignore next */
export const selectVendor = (state$) => state$.vendor;

/* istanbul ignore next */

export function reducer(state = initialState, action: VendorActions): State {
  switch (action.type) {
    case ActionTypes.GET_VENDOR_INIT: {
      return Object.assign({}, state, {
        loading: true,
        vendors: null,
        loadVendorError: null,
      });
    }
    case ActionTypes.GET_VENDOR_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        vendors: action.payload,
        loadVendorError: false,
      });
    }
    case ActionTypes.GET_VENDOR_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        vendors: null,
        loadVendorError: true,
      });
    }

    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
