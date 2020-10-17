import { Component, OnInit } from "@angular/core";
import { DeviceService } from "../alarm.service";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { AuthService } from "../../../core/service/auth.service";
import { ImageFormatterComponent } from "../../../shared/table/cell-action/cell-image.component";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class AlarmListComponent implements OnInit {
  title = "Alarm";
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  columnDefs;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData: any[];
  actionItems = [];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  constructor(
    public auth: AuthService,
    private deviceSvc: DeviceService,
    private router: Router,
    private storage: StorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "",
        field: "deviceType.deviceTypeId",
        width: 80,
        sortable: false,
        autoHeight: true,
        cellRendererFramework: ImageFormatterComponent,
      },
      {
        headerName: "Vehicle Type",
        field: "vehicleType.name",
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
    this.setActionItem();
  }

  loadData() {
    const userId = this.storage.getItem("userId");
    this.deviceSvc.getDeviceByUserId(userId).subscribe((res) => {
      console.log("res=>>>", res);
      this.rowData = res;
    });
  }
  onBtnClick(e) {
    console.log(e);
    if (e.action === "add") {
      this.router.navigate(["/Device/add-edit"]);
    }
    if (e.action === "edit") {
      this.router.navigate(["/Device/add-edit"], { state: this.selectedRow });
    }
  }
  setActionItem() {
    this.actionItems = [];
    this.defaultActionItem = [];
    const actions = this.auth.getActions("Device");
    if (actions.includes("Add")) {
      this.defaultActionItem.push({
        label: "Add",
        action: "add",
        iconClass: "icon-plus",
      });
    }
    if (actions.includes("Edit")) {
      this.actionItems.push({
        label: "Edit",
        action: "edit",
        iconClass: "icon-pencil",
      });
    }
    if (actions.includes("Delete")) {
      this.actionItems.push({
        label: "Delete",
        action: "delete",
        iconClass: "icon-trash",
      });
    }
  }

  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log("selectedRows==>", selectedRows[0].deviceAlarms);
    this.selectedRow = selectedRows[0].deviceAlarms;
    this.showAction = true;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }
}
