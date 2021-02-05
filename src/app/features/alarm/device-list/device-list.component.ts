import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlarmService } from "../alarm.service";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { AuthService } from "../../../core/service/auth.service";
import { ImageFormatterComponent } from "../../../shared/table/cell-action/cell-image.component";
import { AddAlarmComponent } from "../add-alarm/add-alarm.component";
import { NotificationService } from "../../../core/service/notification.server";
import { GeofencingService } from "../../geofencing/geofencing.service";
import { select, Store } from "@ngrx/store";
import * as actions from "../../../state/device/device.actions";
import * as deviceReducer from "../../../state/device/device.reducers";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class AlarmListComponent implements OnInit {
  @ViewChild("modaltemplate") templateRef: TemplateRef<any>;
  @ViewChild("confirmTemplate") confirmTemplate: TemplateRef<any>;

  modalRef: BsModalRef;
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
  geofenceList: any[] = [];
  alarmTypeList: any[] = [];
  operatorList: any[] = [];
  alarmStatusList: any[] = [];

  constructor(
    public auth: AuthService,
    private modalService: BsModalService,
    private deviceSvc: AlarmService,
    private geofenceSvc: GeofencingService,
    private router: Router,
    private storage: StorageService,
    protected _notificationSvc: NotificationService,
    private store: Store<any>
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.store.pipe(select(deviceReducer.selectDevice)).subscribe((res) => {
      console.log(res.device);
      this.rowData = res.device;
      if (this.selectedDevice) {
        this.preSelectRow();
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hideModal(template: TemplateRef<any>) {
    this.modalRef.hide();
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
    const userId = this.storage.getItem("userId");
    this.geofenceSvc.geGeofenceByUser(userId).subscribe((res) => {
      this.geofenceList = res;
    });
  }

  loadData() {
    const userId = this.storage.getItem("userId");
    if (!this.rowData) {
      this.store.dispatch(new actions.GetDeviceInitAction(userId));
    }
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
      this.openModal(this.templateRef);
    }
    if (e.action === "edit") {
      this.selectedAlarm = row;
      this.clickedAction = "edit";
      this.showEdit = true;
      this.openModal(this.templateRef);
    }
    if (e.action === "delete") {
      this.selectedAlarm = row;
      this.openConfirmModal(this.confirmTemplate);
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
    this.hideModal(this.templateRef);
  }
  openConfirmModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(): void {
    this.deviceSvc
      .deleteAlarm(this.selectedAlarm.deviceAlarmId)
      .subscribe((res) => {
        if (res) {
          this._notificationSvc.success(
            "Success",
            "Alarm deleted successfully"
          );
          this.loadData();
          this.modalRef.hide();
        }
      });
  }

  decline(): void {
    this.modalRef.hide();
  }
}
