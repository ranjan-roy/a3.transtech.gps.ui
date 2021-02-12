import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';


const routes: Routes = [
  {
    path: "VehicleSummary",
    component: VehicleSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
