import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddfencingComponent } from "./addfencing/addfencing.component";
import { GeofencingRoutingModule } from "./geofencing-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { FencingListComponent } from "./fencing-list/fencing-list.component";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [AddfencingComponent, FencingListComponent],
  imports: [
    CommonModule,
    GeofencingRoutingModule,
    SharedModule,
    AgGridModule.forRoot([]),
  ],
})
export class GeofencingModule {}
