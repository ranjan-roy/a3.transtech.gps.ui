export interface DeviceSummary {
  online: Number;
  running: Number;
  idle: Number;
  stopped: Number;
  ignition: Number;
  nodata: Number;
  inactive: Number;
  total: Number;
  lat: Number;
  lng: Number;
}

export const mockDeviceList = [
  {
    vehicleType: { vehicleTypeId: 4, name: "Mini Truck" },
    deviceType: { deviceTypeId: 3, name: "Teltonika FMB 920" },
    serial: "359632106727289",
    name: "MH 12 LP 0638",
    dateTime: "2021-01-02T12:30:14",
    ignition: false,
    mileage: 36,
    speed: 0,
    online: true,
    stop: true,
    altitude: 12,
    satellites: 18,
    latitude: 23.8346766,
    longitude: 91.2692783,
    voltageLevel: 12,
    networkLevel: 0,
    systemTime: null,
    geoLocation:
      "Deb Bhawan, Road Number 1, Ram Nagar, Agartala, Tripura. 68 m from Seva Medical Hall pin-799002 (India)",
  },
  {
    vehicleType: { vehicleTypeId: 5, name: "Truck" },
    deviceType: { deviceTypeId: 2, name: "Spotter PRO" },
    serial: "865725031263680",
    name: "MH 12 SD 1432",
    dateTime: "2021-01-02T12:32:57",
    ignition: true,
    mileage: 336.47,
    speed: 0,
    online: true,
    stop: true,
    altitude: 0,
    satellites: 10,
    latitude: 23.834549966666668,
    longitude: 91.2695638,
    voltageLevel: 4,
    networkLevel: 58,
    systemTime: null,
    geoLocation:
      "Basundara, Acharya Jagadish Basu Sarani, Ram Nagar, Agartala, Tripura. 39 m from Pradhan Mantri Kausal Vikas Yojna Centre pin-799002 (India)",
  },
];
