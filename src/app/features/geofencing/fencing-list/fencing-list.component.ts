import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";
import { GeofencingService } from "../../geofencing/geofencing.service";
@Component({
  selector: "app-fencing-list",
  templateUrl: "./fencing-list.component.html",
  styleUrls: ["./fencing-list.component.css"],
})
export class FencingListComponent implements OnInit {
  title = "GeoFencing";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];
  actionItems = [
    { label: "Edit", action: "edit", iconClass: "icon-pencil" },
    { label: "Delete", action: "delete", iconClass: "icon-trash" },
  ];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    private router: Router,
    private storage: StorageService,
    private geofenceSvc: GeofencingService
  ) {}

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
      },

      {
        headerName: "Description",
        field: "description",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Address",
        field: "address",
        sortable: true,
        filter: true,
      },
    ];
  }
  loadData() {
    const userId = this.storage.getItem("userId");
    this.geofenceSvc.geGeofenceByUser(userId).subscribe((res) => {
      console.log(res);
      this.rowData = res.map((item) => {
        item.address = [item.city, item.state, item.country].join(", ");
        return item;
      });
    });
  }
  onBtnClick(e) {
    console.log(e);
    if (e.action === "edit") {
      this.router.navigate(["/geofencing/add-edit"], {
        state: this.selectedRow,
      });
    }
    if (e.action === "delete") {
      this.delete(this.selectedRow.geofenceId);
    }
  }
  delete(id) {
    console.log(id);

    this.geofenceSvc.deleteGeofence(id).subscribe((res) => {
      console.log(res);
      this.loadData();
    });
  }

  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log("selectedRows", selectedRows);
    this.selectedRow = selectedRows[0];
    this.showAction = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }
}
