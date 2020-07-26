import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';


@NgModule({
  declarations: [VendorListComponent],
  imports: [
    CommonModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
