import { Component, OnInit } from "@angular/core";
import { AlarmService } from "../alarm.service";
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
  selectedDevice: any;
  selectedAlarm: any = {
    deviceAlarmId: null,
    deviceId: null,
    alarmTypeId: null,
    alarmText: "",
    value: null,
    operatorId: null,
    alarmStatus: null,
    startDate: "",
    endDate: "",
  };
  clickedAction: any;
  gridApi;
  gridColumnApi;
  showList: boolean = true;
  showEdit: boolean = false;
  rowSelection = "single";
  alarmTypeList: any[] = [];
  operatorList: any[] = [];
  alarmStatusList: any[] = [];
  constructor(
    public auth: AuthService,
    private deviceSvc: AlarmService,
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
        width: 130,
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
        width: 130,
      },
    ];
    this.setActionItem();
    this.deviceSvc.getOperator().subscribe((res) => {
      this.operatorList = res;
    });
    this.deviceSvc.getAlarmStatus().subscribe((res) => {
      this.alarmStatusList = res;
    });
    this.deviceSvc.getAllAlarmType().subscribe((res) => {
      this.alarmTypeList = res;
    });
  }

  loadData() {
    const userId = this.storage.getItem("userId");
    this.deviceSvc.getDeviceByUserId(userId).subscribe((res) => {
      this.rowData = res;
      if (this.selectedDevice) {
        this.preSelectRow();
      }
    });
  }
  onBtnClick(e, row, id) {
    if (e.action === "add") {
      this.showEdit = true;
      this.selectedAlarm = {
        deviceAlarmId: null,
        deviceId: null,
        alarmTypeId: null,
        alarmText: "",
        value: null,
        operatorId: null,
        alarmStatus: null,
        startDate: "",
        endDate: "",
      };
    }
    if (e.action === "edit") {
      this.selectedAlarm = row;
      this.clickedAction = "edit";
      this.showEdit = true;
    }
    if (e.action === "delete") {
      this.deviceSvc.deleteAlarm(id).subscribe((res) => {
        if (res) this.loadData();
      });
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
    this.selectedDevice = selectedRows[0];
    this.showAction = true;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }

  preSelectRow() {
    this.rowData.forEach((row) => {
      if (row.deviceId === this.selectedDevice.deviceId) {
        this.selectedDevice.deviceAlarms = row.deviceAlarms;
      }
    });
    setTimeout(() => {
      this.gridApi.forEachNode((node) => {
        node.setSelected(node.data.deviceId === this.selectedDevice.deviceId);
      });
    });
  }

  updateTable(alarm) {
    this.loadData();
  }
}
