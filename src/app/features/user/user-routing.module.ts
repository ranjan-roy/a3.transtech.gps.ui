import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { AddUserComponent } from "./add-user/add-user.component";

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
    data: {
      title: "User",
    },
  },
  {
    path: "add-user",
    component: AddUserComponent,
    data: {
      title: "User",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
