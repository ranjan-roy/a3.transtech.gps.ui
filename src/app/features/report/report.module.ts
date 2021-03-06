import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportRoutingModule } from "./report-routing.module";
import { VehicleSummaryComponent } from "./vehicle-summary/vehicle-summary.component";
import { SharedModule } from "../../shared/shared.module";
import { ReportFilterComponent } from "./report-filter/report-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { AgGridModule } from "ag-grid-angular";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";
import { VehiclePositionComponent } from "./vehicle-position/vehicle-position.component";
import { CellViewAddressRendererComponent } from "../../shared/table/cell-action/cell-view-address.renderer";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [
    VehicleSummaryComponent,
    ReportFilterComponent,
    VehiclePositionComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule.forRoot(),
    AgGridModule.forRoot([
      CellActionComponent,
      CellViewAddressRendererComponent,
    ]),
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class ReportModule {}
