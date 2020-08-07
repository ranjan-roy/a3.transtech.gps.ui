import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-cell-action",
  template: `
    <button
      type="button"
      (click)="onClick($event, action)"
      class="btn  btn-link"
      *ngFor="let action of actions"
    >
      <i class="fa fa-pencil"></i> {{ action.label }}
    </button>
  `,
})
export class CellActionComponent implements ICellRendererAngularComp {
  params;
  label: string;
  actions: any[];

  agInit(params): void {
    this.params = params;
    this.actions = this.params.colDef.actionItems;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event, action) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        action,
        event: action.action,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }

  onDelete($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: "delete",
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
