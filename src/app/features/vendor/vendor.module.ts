import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';

import { AgGridModule } from 'ag-grid-angular';

import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  declarations: [VendorListComponent,  AddEditComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
     
    AgGridModule
  ],
  providers: [],
  
  bootstrap: [VendorListComponent]

})
export class VendorModule { }
