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
        "deviceId": 1,
        "userId": 3,

        "vendorId": 2,

        "vehicleTypeId": 4,
        "vehicleType": {
            "vehicleTypeId": 4,
            "name": "Mini Truck"
        },
        "deviceTypeId": 3,
        "deviceType": {
            "deviceTypeId": 3,
            "name": "Teltonika FMB 920"
        },
        "geoLocation": "Sy No. 3/8, Kariyamana Agrahara,Beside Vaswani Astoria, Post, Bellandur, Varthur, Karnataka 560087 ",
        "serial": "359632106727289",
        "name": "Teltonika",
        "dateTime": "2020-12-17T15:16:22",
        "ignition": false,
        "mileage": 36,
        "speed": 0,
        "altitude": 13,
        "satellites": 15,
        "latitude": 23.836265,
        "longitude": 91.26906,
        "voltageLevel": 12,
        "networkLevel": 0,
        "course": 0,
        "systemTime": null,
        "dataEvent": 0,
        "stop": true,
        "stopDateTime": "2020-12-03T14:07:28",
        "online": true,
        "lastIgnition": "2020-12-17T10:11:22"
    },
    {
        "deviceId": 2,
        "userId": 3,
        "geoLocation": "Marathahalli - Sarjapur Outer Ring Rd, Chandana,",
        "vendorId": 2,
        "vehicleTypeId": 5,
        "vehicleType": {
            "vehicleTypeId": 5,
            "name": "Truck"
        },
        "deviceTypeId": 2,
        "deviceType": {
            "deviceTypeId": 2,
            "name": "Spotter PRO"
        },
        "serial": "865725031263680",
        "name": "Atlanta",
        "dateTime": "2020-12-17T09:42:40",
        "ignition": true,
        "mileage": 333.89,
        "speed": 0,
        "altitude": 0,
        "satellites": 10,
        "latitude": 23.834724933333334,
        "longitude": 91.26940103333334,
        "voltageLevel": 4,
        "networkLevel": 29,
        "course": 267,
        "systemTime": null,
        "dataEvent": 0,
        "stop": true,
        "stopDateTime": "2020-12-10T07:21:20",
        "online": true,
        "lastIgnition": "2020-12-14T15:08:49"
    }
]