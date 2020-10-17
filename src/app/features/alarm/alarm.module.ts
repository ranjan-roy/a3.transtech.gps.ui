import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlarmListComponent } from "./device-list/device-list.component";
import { AlarmRoutingModule } from "./alarm-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { DeviceService } from "./alarm.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";

@NgModule({
  declarations: [AlarmListComponent],
  imports: [
    CommonModule,
    AlarmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([CellActionComponent]),
    SharedModule,
  ],
  providers: [DeviceService],

  bootstrap: [AlarmListComponent],
})
export class AlarmModule {}
