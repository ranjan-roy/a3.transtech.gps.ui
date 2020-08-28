import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddfencingComponent } from "./addfencing/addfencing.component";
import { FencingListComponent } from "./fencing-list/fencing-list.component";
import { ViewFencingComponent } from './view-fencing/view-fencing.component';

const routes: Routes = [
  {
    path: "",
    component: FencingListComponent,
    data: {
      title: "FencingList",
    },
  },
  {
    path: "add-edit",
    component: AddfencingComponent,
    data: {
      title: "geofencing",
    },
  },
  {
    path: "view-fencing",
    component: ViewFencingComponent,
    data: {
      title: "geofencing",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeofencingRoutingModule {}
