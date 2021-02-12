import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorRoutingModule } from "./vendor-routing.module";
import { VendorListComponent } from "./vendor-list/vendor-list.component";

import { AgGridModule } from "ag-grid-angular";

import { AddEditComponent } from "./add-edit/add-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CellActionComponent } from "../../shared/table/cell-action/cell-action.component";
import { SharedModule } from "../../shared/shared.module";
import { VendorService } from "../../services/vendor.service";

@NgModule({
  declarations: [VendorListComponent, AddEditComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule.forRoot([CellActionComponent]),
  ],
  providers: [VendorService],

  bootstrap: [VendorListComponent],
})
export class VendorModule {}
