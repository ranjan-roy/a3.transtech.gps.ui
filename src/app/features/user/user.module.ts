import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { AgGridModule } from "ag-grid-angular";
import { UserService } from "./user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [AddUserComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.forRoot(),

    BsDatepickerModule.forRoot(),
  ],
  providers: [UserService],

  bootstrap: [UserListComponent],
})
export class UserModule {}
