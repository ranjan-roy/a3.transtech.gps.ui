import * as UserReducer from "./user/user.reducers";
import * as DeviceReducer from "./device/device.reducers";
import * as VendorReducer from "./vendor/vendor.reducers";

// Declare the "State" for the entire app which is comprised of all "States"
// from all components
export interface State {
  currentUser: UserReducer.State;
  device: DeviceReducer.State;
}

// Define a set of reducers for the "store" to use
export const reducers = {
  user: UserReducer.reducer,
  device: DeviceReducer.reducer,
  vendor: VendorReducer.reducer,
};
