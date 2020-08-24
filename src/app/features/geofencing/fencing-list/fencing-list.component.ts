import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";

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
  actionItems = [{ label: "Edit", action: "edit", iconClass: "icon-pencil" }];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "GeoFencing Id",
        field: "geofencingId",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
      },

      {
        headerName: "Langitude",
        field: "langitude",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Atitude",
        field: "atitude",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Location",
        field: "location",
        sortable: true,
        filter: true,
      },
    ];
  }

  onBtnClick(e) {
    console.log(e);
    if (e.action === "edit") {
      this.router.navigate(["/geofencing/add-edit"], {
        state: this.selectedRow,
      });
    }
  }
}
