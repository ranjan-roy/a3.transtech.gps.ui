import { Store, select } from "@ngrx/store";
import { OperatorActions, ActionTypes } from "./operator.actions";

export interface State {
  loading: boolean;
  operators: any;
  loadOperatorError: boolean;
}

export const initialState: State = {
  loading: false,
  operators: null,
  loadOperatorError: false,
};
/* istanbul ignore next */
export const selectIsLoading = (state$) => {
  return state$.pipe(select((s: any) => s.loading));
};
/* istanbul ignore next */
export const selectOperator = (state$) => state$.operator.operators;

/* istanbul ignore next */

export function reducer(state = initialState, action: OperatorActions): State {
  switch (action.type) {
    case ActionTypes.GET_OPERATOR_INIT: {
      return Object.assign({}, state, {
        loading: true,
        operators: null,
        loadOperatorError: null,
      });
    }
    case ActionTypes.GET_OPERATOR_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        operators: action.payload,
        loadOperatorError: false,
      });
    }
    case ActionTypes.GET_OPERATOR_FAIL: {
      console.log(action);
      return Object.assign({}, state, {
        loading: false,
        operators: null,
        loadOperatorError: true,
      });
    }

    /* istanbul ignore next */
    default: {
      return state;
    }
  }
}
