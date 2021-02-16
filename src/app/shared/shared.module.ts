import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CellActionComponent } from "./table/cell-action/cell-action.component";
import { VehicleInfoComponent } from "./vehicle-info/vehicle-info.component";
import { AgmCoreModule } from "@agm/core";
import { environment } from "../../environments/environment";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { CellViewAddressRendererComponent } from "./table/cell-action/cell-view-address.renderer";
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    CellActionComponent,
    VehicleInfoComponent,
    GoogleMapsComponent,
    CellViewAddressRendererComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapKey,
      // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    }),
  ],
  exports: [
    CellActionComponent,
    VehicleInfoComponent,
    GoogleMapsComponent,
    CellViewAddressRendererComponent,
  ],
})
export class SharedModule { }
