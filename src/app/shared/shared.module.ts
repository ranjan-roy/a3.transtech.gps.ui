import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CellActionComponent } from "./table/cell-action/cell-action.component";
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';

@NgModule({
  declarations: [CellActionComponent, VehicleInfoComponent],
  imports: [CommonModule],
  exports: [CellActionComponent,VehicleInfoComponent],
})
export class SharedModule {}
