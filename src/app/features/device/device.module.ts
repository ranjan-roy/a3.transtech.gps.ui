import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddDeviceComponent } from "./add-device/add-device.component";
import { DeviceListComponent } from "./device-list/device-list.component";
import { DeviceRoutingModule } from "./device-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";
import { DeviceService } from "../../services/device.service";

@NgModule({
  declarations: [AddDeviceComponent, DeviceListComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([CellActionComponent]),
    SharedModule,
  ],
  providers: [DeviceService],

  bootstrap: [DeviceListComponent],
})
export class DeviceModule {}
