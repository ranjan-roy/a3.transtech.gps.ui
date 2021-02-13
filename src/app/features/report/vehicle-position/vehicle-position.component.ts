import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { PositionService } from "../../../services/position.service";
import { ImageFormatterComponent } from "../../../shared/table/cell-action/cell-image.component";
import * as actions from "../../../state/device/device.actions";
import * as deviceReducer from "../../../state/device/device.reducers";
const mockData = [
  {
    vehicleType: {
      vehicleTypeId: 5,
      name: "Truck",
    },
    deviceType: {
      deviceTypeId: 2,
      name: "Spotter PRO",
    },
    serial: "865725031263680",
    name: "MH 12 SD 1432",
    maxSpeed: 41,
    averageSpeed: 23,
    distanceCovered: 28,
    idealTime: "21:51:26",
    runningTime: "02:08:33",
  },
  {
    vehicleType: {
      vehicleTypeId: 4,
      name: "Mini Truck",
    },
    deviceType: {
      deviceTypeId: 3,
      name: "Teltonika FMB 920",
    },
    serial: "359632106727289",
    name: "MH 12 LP 0638",
    maxSpeed: 44,
    averageSpeed: 21,
    distanceCovered: 25,
    idealTime: "22:21:29",
    runningTime: "01:38:30",
  },
];
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
  columnDefs: any[];
  pagination = "true";
  paginationPageSize: "10";
  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  rowData = mockData;
  actionItems = [];
  defaultActionItem = [];
  showAction: boolean = false;
  selectedRow: any;
  gridApi;
  gridColumnApi;
  rowSelection = "single";

  constructor(private positionSvc: PositionService, private router: Router) { }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: "",
        field: "vehicleType.vehicleTypeId",
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
        field: "Name",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Data Time",
        field: "DataTime",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Ignition",
        field: "Ignition",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Mileage",
        field: "Mileage",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Speed",
        field: "Speed",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Online",
        field: "online",
        sortable: true,
        filter: true,
      },
     


    ];
    // this.loadData();
  }

  loadData() {
    this.startDate = "2021-01-05 00:12:49";
    this.endDate = "2021-01-06 00:12:49";
    this.rowData = mockData.map((item) => {
      return {
        ...item,
        vehicleTypeId: item.vehicleType.vehicleTypeId,
      };
    });
    // this.positionSvc
    //   .getDeviceSummary(this.startDate, this.endDate)
    //   .subscribe((res) => {
    //     this.deviceList = res;
    //     this.rowData = res.map((item) => {
    //       return {
    //         ...item,
    //         vehicleTypeId: item.vehicleType.vehicleTypeId,
    //       };
    //     });
    //   });
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

  onShowMap(e) { }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.loadData();
  }
  onSelectionChanged(e) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0];
    this.showAction = true;
    this.router.navigate(['Report/VehiclePosition']);
  }
}
