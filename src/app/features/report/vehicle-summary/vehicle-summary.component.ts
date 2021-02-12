import { Component, OnInit } from "@angular/core";
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
  selector: "app-vehicle-summary",
  templateUrl: "./vehicle-summary.component.html",
  styleUrls: ["./vehicle-summary.component.css"],
})
export class VehicleSummaryComponent implements OnInit {
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

  constructor(private positionSvc: PositionService) {}

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
        headerName: "Device Type",
        field: "deviceType.name",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Company",
        field: "user.companyName",
        sortable: true,
        filter: true,
      },
      {
        headerName: "Vendor",
        field: "vendor.name",
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
  }
}
