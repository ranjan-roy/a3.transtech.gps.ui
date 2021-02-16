import { ColumnDefinition } from "../../interface/common.interface";
import { ImageFormatterComponent } from "../../shared/table/cell-action/cell-image.component";
import { CellViewAddressRendererComponent } from "../../shared/table/cell-action/cell-view-address.renderer";

export const vehicleSummaryColDef: ColumnDefinition[] = [
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
    headerName: "Serial",
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
  {
    headerName: "Max Speed",
    field: "maxSpeed",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Average Speed",
    field: "averageSpeed",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Distance Covered",
    field: "vehicleType.name",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Ideal Time",
    field: "idealTime",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Running Time",
    field: "runningTime",
    sortable: true,
    filter: true,
  },
];

export const vehiclePositionColDef: ColumnDefinition[] = [
  {
    headerName: "Name",
    field: "device.name",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Data Time",
    field: "dateTime",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Ignition",
    field: "ignition",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Mileage",
    field: "mileage",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Speed",
    field: "speed",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Online",
    field: "device.online",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Address",
    field: "device.name",
    minWidth: 300,
    cellRendererFramework: CellViewAddressRendererComponent,
  },
];
