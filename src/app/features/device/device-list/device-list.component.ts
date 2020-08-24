import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../device.service";
import { Router } from "@angular/router";
import { CellActionComponent } from "../../../shared/table/cell-action/cell-action.component";
import { StorageService } from "../../../core/service/storage.service";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class DeviceListComponent implements OnInit {
  title = "Device";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = [];
  actionItems = [{ label: "Edit", action: "edit",iconClass:"icon-pencil" }];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    private deviceSvc: DeviceService,
    private router: Router,
    private storage: StorageService
  ) {
    
  }

  ngOnInit(): void {
    this.columnDefs = [
    {
        headerName: "Device Id",
        field: "deviceId",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Serial Number",
        field: "serial",
        sortable: true,
        filter: true,
      },

      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
      },
      
      // {
      //   headerName: "Actions",
      //   field: "action",
      //   cellRenderer: "buttonRenderer",
      //   cellRendererParams: {
      //     label: "Edit",
      //     onClick: this.onBtnClick.bind(this),
      //   },
      //   actionItems: [{ label: "Edit", action: "edit" }],
      // },
    ];
    
  }

  loadData() {
    const userId = this.storage.getItem("userId");
    this.deviceSvc.getDeviceByUserId(userId).subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
  }
  onBtnClick(e) {
    console.log(e);
    if (e.action === "edit") {
      this.router.navigate(["/device/add-edit"], { state: this.selectedRow });
    }
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