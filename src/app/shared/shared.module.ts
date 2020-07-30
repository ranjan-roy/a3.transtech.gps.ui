import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellActionComponent } from './table/cell-action/cell-action.component';

@NgModule({
  declarations: [CellActionComponent],
  imports: [
    CommonModule,
  ],
  exports: [CellActionComponent]
})
export class SharedModule { }
