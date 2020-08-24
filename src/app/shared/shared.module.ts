import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CellActionComponent } from "./table/cell-action/cell-action.component";
import { AgmCoreModule } from "@agm/core";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";

@NgModule({
  declarations: [CellActionComponent, GoogleMapsComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA",
      // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    }),
  ],
  exports: [CellActionComponent, GoogleMapsComponent],
})
export class SharedModule {}
