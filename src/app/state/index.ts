import * as UserReducer from "./user/user.reducers";
import * as DeviceReducer from "./device/device.reducers";
import * as VendorReducer from "./vendor/vendor.reducers";
import * as OperatorReducer from "./operator/operator.reducers";
import * as ReportReducer from "./report/report.reducers";
import * as NotificationReducer from "./notifications/notification.reducers";

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
  report: ReportReducer.reducer,
  vendor: VendorReducer.reducer,
  operator: OperatorReducer.reducer,
  notification: NotificationReducer.reducer,
};
