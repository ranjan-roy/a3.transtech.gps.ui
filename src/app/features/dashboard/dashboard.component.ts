import { Component, Input, OnInit } from "@angular/core";
import { mockDeviceList } from "./dashboard.constant";
import { select, Store } from "@ngrx/store";
import * as actions from "../../state/device/device.actions";
import * as deviceReducer from "../../state/device/device.reducers";

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
  www: string;
}

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public deviceList = [];
  public rows = [];
  public deviceSummary = {
    online: 0,
    running: 0,
    idle: 0,
    stopped: 0,
    ignition: 0,
    inactive: 0,
    total: 0,
    lat: 0,
    lng: 0,
  };
  zoom: number = 15;
  markers: Marker[] = [];
  viewMap: boolean = false;
  constructor(private store: Store<any>) {
    this.store.pipe(select(deviceReducer.selectDevice)).subscribe((res) => {
      if (res.devicePositions && res.devicePositions.length) {
        this.loadData(res.devicePositions);
      }
    });
  }

  onMapReady() {}

  ngOnInit(): void {
    if (!this.deviceList.length) {
      this.store.dispatch(new actions.GetDevicePositionInitAction({}));
    }
  }

  loadLocalData() {
    this.deviceList = mockDeviceList;
    this.rows = mockDeviceList;
    this.setDeviceSummary();
  }

  loadData(res) {
    this.deviceList = res;
    this.rows = res;
    this.setDeviceSummary();
  }

  setDeviceSummary() {
    this.deviceSummary.total = this.deviceList.length;
    this.deviceList.map((value: any, index: number) => {
      if (value.online == true) {
        this.deviceSummary.online = this.deviceSummary.online + 1;
      } else {
        this.deviceSummary.inactive = this.deviceSummary.inactive + 1;
      }

      if (
        value.stop == true &&
        value.ignition == true &&
        value.online == true
      ) {
        this.deviceSummary.stopped = this.deviceSummary.stopped + 1;
      } else if (
        value.speed > 0 &&
        value.stop == false &&
        value.online == true &&
        value.ignition == true
      ) {
        this.deviceSummary.running = this.deviceSummary.running + 1;
      }

      if (value.ignition == true && value.online == true) {
        this.deviceSummary.ignition = this.deviceSummary.ignition + 1;
      }
    });
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

  checkRule(filterQuery, item) {
    let match = {
      name: false,
      isNameMatchRequired: !!filterQuery.name,
      location: false,
      isLocationMatchRequired: !!filterQuery.geoLocation,
      ignition: false,
      isIgnitionMatchRequired: filterQuery.ignition !== null,
    };
    if (filterQuery.name) {
      match.name = item.name.toLowerCase().includes(filterQuery.name);
    }

    if (filterQuery.geoLocation) {
      match.location = item.geoLocation
        .toLowerCase()
        .includes(filterQuery.geoLocation);
    }

    if (filterQuery.ignition !== null) {
      match.ignition = item.ignition === filterQuery.ignition;
    }

    if (match.isNameMatchRequired && match.isLocationMatchRequired) {
      return (
        (match.isNameMatchRequired === match.name ||
          match.isLocationMatchRequired === match.location) &&
        match.isIgnitionMatchRequired === match.ignition
      );
    }

    return (
      match.isNameMatchRequired === match.name &&
      match.isLocationMatchRequired === match.location &&
      match.isIgnitionMatchRequired === match.ignition
    );
  }

  onSetDeviceFilter(filterQuery) {
    const filteredRows = [];
    this.deviceList.forEach((item) => {
      if (this.checkRule(filterQuery, item)) {
        filteredRows.push(item);
      }
    });
    this.rows = filteredRows;
  }
}
