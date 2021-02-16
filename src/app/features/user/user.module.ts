import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { UserService } from "../../services/user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";

@NgModule({
  declarations: [AddUserComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot([CellActionComponent]),
    SharedModule,
  ],
  providers: [UserService],

  bootstrap: [UserListComponent],
})
export class UserModule {}
