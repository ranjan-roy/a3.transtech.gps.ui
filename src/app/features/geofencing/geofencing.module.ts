import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddfencingComponent } from "./addfencing/addfencing.component";
import { GeofencingRoutingModule } from "./geofencing-routing.module";

@NgModule({
  declarations: [AddfencingComponent],
  imports: [CommonModule, GeofencingRoutingModule],
})
export class GeofencingModule {}
