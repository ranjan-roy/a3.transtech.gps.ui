import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { ColumnDefinition } from "../../../interface/common.interface";
import { mockPositionData } from "../../../mockdata/report.mock";
import { PositionService } from "../../../services/position.service";
import { UtilService } from "../../../services/util.service";
import { ImageFormatterComponent } from "../../../shared/table/cell-action/cell-image.component";
import * as actions from "../../../state/device/device.actions";
import * as deviceReducer from "../../../state/device/device.reducers";
import { vehiclePositionColDef } from "../report.constant";

@Component({
  selector: "app-vehicle-Position",
  templateUrl: "./vehicle-Position.component.html",
  styleUrls: ["./vehicle-Position.component.css"],
})
export class VehiclePositionComponent implements OnInit {
  deviceList: any;
  rows: any;
  startDate: string;
  endDate: string;
  columnDefs: ColumnDefinition[] = vehiclePositionColDef;
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  deviceSummary: any = null;
  rowData = null;
  actionItems = [];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  defaultColDef = { resizable: true };

  constructor(
    private router: Router,
    private positionSvc: PositionService,
    private utilSvc: UtilService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.deviceSummary = navigation.extras.state;
    }
  }

  ngOnInit(): void {}

  loadData() {
    if (this.deviceSummary) {
      this.positionSvc
        .getPositionData({
          deviceId: this.deviceSummary.deviceType.deviceTypeId,
          ...this.utilSvc.getHourBehindDateTime(6),
        })
        .subscribe((res) => {
          this.rowData = res.map((item) => {
            return {
              ...item,
              vehicleTypeId: item.device.vehicleTypeId,
            };
          });
          console.log(this.rowData);
        });
      this.gridApi.sizeColumnsToFit();
    }
  }

  onSetDeviceFilter(filterQuery) {
    const filteredRows = [];
    this.deviceList.forEach((item) => {
      if (this.checkRule(filterQuery, item)) {
        filteredRows.push(item);
      }
    });
    console.log(filterQuery, filteredRows);

    this.rows = filteredRows;
  }

  checkRule(filterQuery, item) {
    let match = {
      name: false,
      isNameMatchRequired: !!filterQuery.name,
    };
    if (filterQuery.name) {
      match.name = item.name.toLowerCase().includes(filterQuery.name);
    }

    if (match.isNameMatchRequired) {
      return match.isNameMatchRequired === match.name;
    }

    return match.isNameMatchRequired === match.name;
  }

  onShowMap(e) {}
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }
  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0];
    this.showAction = true;
    this.router.navigate(["Report/VehiclePosition"]);
  }
}
