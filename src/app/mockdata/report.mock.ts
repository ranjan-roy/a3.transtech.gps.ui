const cars = [
  "MH 1 SD 1432",
  "BR 2 SD 1432",
  "KA 1 SD 1432",
  "CO 1 SD 1432",
  "DL 1 SD 1432",
  "TN 1 SD 1432",
  "HP 1 SD 1432",
  "BH 1 SD 1432",
  "MP 1 SD 1432",
  "BR 2 SD 1432",
  "KA 1 SD 1432",
  "CO 1 SD 1432",
  "DL 1 SD 1432",
  "TN 1 SD 1432",
  "HP 1 SD 1432",
  "BH 1 SD 1432",
  "MP 1 SD 1432",
];

const mockDeviceSummary = (): any[] => {
  let list = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      vehicleType: {
        vehicleTypeId: i % 5 == 0 ? 1 : i % 5,
        name: "Truck",
      },
      deviceType: {
        deviceTypeId: i % 5 == 0 ? 1 : i % 5,
        name: "Spotter PRO",
      },
      serial: "865725031263680",
      name: cars[i],
      maxSpeed: 2,
      averageSpeed: i * 100,
      distanceCovered: 28,
      idealTime: "21:51:26",
      runningTime: "02:08:33",
    });
  }
  return list;
};
const mockPositionData = (): any[] => {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      positionId: 60803,
      deviceId: 1,
      device: {
        deviceId: 1,
        userId: 3,
        user: null,
        vendorId: 2,
        vendor: null,
        vehicleTypeId: i % 5 == 0 ? 1 : i % 5,
        vehicleType: null,
        deviceTypeId: i % 5 == 0 ? 1 : i % 5,
        deviceType: null,
        deviceAlarms: [],
        serial: "359632106727289",
        name: "MH 12 LP 0638",
        dateTime: "2021-02-02T14:44:59",
        ignition: false,
        mileage: 59,
        speed: 0,
        altitude: 2,
        satellites: 12,
        latitude: 23.8345666,
        longitude: 91.2694333,
        voltageLevel: 13,
        networkLevel: 0,
        course: 0,
        systemTime: null,
        dataEvent: 0,
        stop: true,
        stopDateTime: "2021-01-06T14:10:51",
        online: true,
        lastIgnition: "2021-01-05T15:24:43",
      },
      dateTime: "2021-01-01T00:12:49",
      ignition: false,
      mileage: 36,
      speed: 0,
      altitude: 19,
      satellites: 18,
      latitude: 23.8346733,
      longitude: 91.2693333,
      voltageLevel: 13,
      networkLevel: 0,
      course: 0,
      systemTime: "2021-01-01T05:42:51.026916+05:30",
      dataEvent: 0,
      protocol: "teltonika",
    });
  }
  return list;
};
export { mockDeviceSummary, mockPositionData };
// xz+ nexon grey - petrol
// ev+
