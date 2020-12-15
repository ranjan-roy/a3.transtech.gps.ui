import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from "@agm/core";
import { environment } from '../../../environments/environment';
import { GoogleMapsModule } from '@angular/google-maps';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardWidgetsComponent } from './dashboard-widgets/dashboard-widgets.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SharedModule,
    GoogleMapsModule,
  ],
  declarations: [DashboardComponent, DashboardFilterComponent, DashboardWidgetsComponent]
})
export class DashboardModule { }
