import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';
import { SharedModule } from '../../shared/shared.module';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [VehicleSummaryComponent, ReportFilterComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule.forRoot()
  ]
})
export class ReportModule { }
