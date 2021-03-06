import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlarmListComponent } from "./device-list/device-list.component";
import { AddAlarmComponent } from "./add-alarm/add-alarm.component";

const routes: Routes = [
  {
    path: "",
    component: AlarmListComponent,
    data: {
      title: "Alarm",
    },
  },
  {
    path: "add-edit",
    component: AddAlarmComponent,
    data: {
      title: "Alarm",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmRoutingModule {}
