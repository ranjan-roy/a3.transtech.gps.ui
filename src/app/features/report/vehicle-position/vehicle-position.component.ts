import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ColumnDefinition } from "../../../interface/common.interface";
import { mockPositionData } from "../../../mockdata/report.mock";
import { DeviceService } from "../../../services/device.service";
import { PositionService } from "../../../services/position.service";
import { UtilService } from "../../../services/util.service";
import { vehiclePositionColDef } from "../report.constant";

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
  www: string;
}
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
  rowData = [];
  actionItems = [];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";
  defaultColDef = { resizable: true };
  startHr = 0;
  address: string = null;
  loadingAddress = false;
  errorAddress = false;
  zoom: number = 15;
  markers: Marker[] = [];
  viewMap: boolean = false;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private router: Router,
    private positionSvc: PositionService,
    private deviceSvc: DeviceService,
    private utilSvc: UtilService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.deviceSummary = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(more: boolean = false) {
    if (this.deviceSummary) {
      const { startDate, endDate } = this.utilSvc.getHourBehindDateTime(this.startHr, this.startHr + 6);

      this.startHr = this.startHr + 6;
      this.positionSvc
        .getPositionData({
          deviceId: this.deviceSummary.deviceType.deviceTypeId,
          startDate,
          endDate
        })
        .subscribe((res) => {
          if (res) {
            const result = res.map((item) => {
              return {
                ...item,
                vehicleTypeId: item.device.vehicleTypeId,
              };
            });
            if (!more) {
              this.rowData = result;
            } else {
              result.forEach((item) => {
                this.rowData.push(item);
              });
            }
          }
        });
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
  hideMap() {
    this.viewMap = false;
  }
  onShowMap(value) {
    this.deviceSummary.lat = value.latitude;
    this.deviceSummary.lng = value.longitude;
    this.viewMap = true;
    this.markers = [
      {
        lat: value.latitude,
        lng: value.longitude,
        label: "S",
        draggable: false,
        title: value.name,
        www: "",
      },
    ];
  }

  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0];
    this.showAction = true;
    this.router.navigate(["Report/VehiclePosition"]);
  }

  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      console.log("On Scroll End");
      this.loadData(true);
    }
  }
  onBtnClick(item, i) {
    this.rowData[i].loadingAddress = true;
    this.rowData[i].errorAddress = false;
    this.rowData[i].address = null;
    this.deviceSvc
      .GetPositionAddress({ lat: item.latitude, lng: item.longitude })
      .subscribe((res) => {
        if (res.results && res.results.length) {
          this.rowData[i].loadingAddress = false;
          this.rowData[i].address = res.results[0].formatted_Address;
        } else {
          this.rowData[i].errorAddress = true;
        }
      });
  }
}
