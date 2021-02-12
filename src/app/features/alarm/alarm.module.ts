import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddAlarmComponent } from "./add-alarm/add-alarm.component";
import { AlarmListComponent } from "./device-list/device-list.component";
import { AlarmRoutingModule } from "./alarm-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { ModalModule } from "ngx-bootstrap/modal";
import { AlarmService } from "../../services/alarm.service";

@NgModule({
  declarations: [AlarmListComponent, AddAlarmComponent],
  imports: [
    CommonModule,
    AlarmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([CellActionComponent]),
    SharedModule,
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AlarmService],

  bootstrap: [AlarmListComponent, AddAlarmComponent],
})
export class AlarmModule {}
