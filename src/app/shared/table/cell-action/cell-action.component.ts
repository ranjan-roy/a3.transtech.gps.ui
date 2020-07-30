import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-cell-action',
  template: `
  <button type="button" (click)="onEdit($event)" class="btn  btn-link"><i class="fa fa-pencil"></i> Edit</button>
  <button type="button" (click)="onDelete($event)" class="btn  btn-link"><i class="fa fa-trash"></i> Delete</button>
  `,
})
export class CellActionComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEdit($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: 'edit',
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }


  onDelete($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: 'delete',
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

}
