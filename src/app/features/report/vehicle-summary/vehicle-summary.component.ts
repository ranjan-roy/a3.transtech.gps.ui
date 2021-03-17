import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as reportActions from "../../../state/report/report.actions";
import * as reportReducer from "../../../state/report/report.reducers";
import { vehicleSummaryColDef } from "../report.constant";
import { ColumnDefinition } from "../../../interface/common.interface";
import { UtilService } from "../../../services/util.service";

@Component({
  selector: "app-vehicle-summary",
  templateUrl: "./vehicle-summary.component.html",
  styleUrls: ["./vehicle-summary.component.css"],
})
export class VehicleSummaryComponent implements OnInit {
  deviceList: any;
  rows: any;
  startDate: string;
  endDate: string;
  columnDefs: ColumnDefinition[] = vehicleSummaryColDef;
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = null;
  actionItems = [];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";

  constructor(
    private router: Router,
    private store: Store<any>,
    private utilSvc: UtilService
  ) {
    this.store
      .pipe(select(reportReducer.selectVehicleSummary))
      .subscribe((res) => {
        if (res) {
          this.rowData = res.map((item) => {
            return {
              ...item,
              averageSpeed: `${item.averageSpeed} km/h`,
              maxSpeed: `${item.maxSpeed} km/h`,
              vehicleTypeId: item.vehicleType.vehicleTypeId,
            };
          });
        }
      });
  }

  ngOnInit(): void {}

  loadData(range: number = 1) {
    const payload = this.utilSvc.getDayBehindDateTime(range);
    this.store.dispatch(new reportActions.GetVehicleSummaryInitAction(payload));
  }

  onSetDeviceFilter(filterQuery) {
    const filteredRows = [];
    this.rowData.forEach((item) => {
      if (this.checkRule(filterQuery, item)) {
        filteredRows.push(item);
      }
    });
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
    if (!this.rowData) {
      this.loadData(1);
    }
  }
  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0];
    this.showAction = true;
    this.router.navigate(["Report/VehiclePosition"], {
      state: this.selectedRow,
    });
  }
  onsetDateRange(range: number = 1) {
    this.loadData(range);
  }
}
