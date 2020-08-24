import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddfencingComponent } from "./addfencing/addfencing.component";

const routes: Routes = [
  {
    path: "",
    component: AddfencingComponent,
    data: {
      title: "Addfencing",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeofencingRoutingModule {}
