import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DeviceListComponent } from "./device-list/device-list.component";
import { AddDeviceComponent } from "./add-device/add-device.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceListComponent,
    data: {
      title: "Device",
    },
  },
  {
    path: "add-edit",
    component: AddDeviceComponent,
    data: {
      title: "Device",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
