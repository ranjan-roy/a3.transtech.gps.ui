import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VendorListComponent,
    data: {
      title: 'Vendors'
    }

  },
  {
    path: 'add-edit',
    component: AddEditComponent,
    data: {
      title: 'Vendors'
    }
    
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
