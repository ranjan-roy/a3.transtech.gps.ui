import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclePositionComponent } from './vehicle-position/vehicle-position.component';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';


const routes: Routes = [
  {
    path: "VehicleSummary",
    component: VehicleSummaryComponent
  },
  {
    path: "VehiclePosition",
    component: VehiclePositionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
