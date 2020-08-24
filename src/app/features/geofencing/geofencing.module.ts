import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddfencingComponent } from "./addfencing/addfencing.component";
import { GeofencingRoutingModule } from "./geofencing-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";
@NgModule({
  declarations: [AddfencingComponent],
  imports: [CommonModule, GeofencingRoutingModule, GoogleMapsModule],
})
export class GeofencingModule {}
