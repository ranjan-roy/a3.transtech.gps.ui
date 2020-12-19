import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from ".././device/device.service";
import { StorageService } from "../../core/service/storage.service";
import { mockDeviceList } from './dashboard.constant';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
  www: string;
}

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public deviceList = [];
  public rows = [];
  public deviceSummary = {
    running: 0,
    idle: 0,
    stopped: 0,
    nodata: 0,
    inactive: 0,
    total: 0,
    lat: 0,
    lng: 0,
  }
  zoom: number = 20;
  markers: Marker[] = [];
  viewMap: boolean = false
  constructor(
    private deviceSvc: DeviceService,
    private storage: StorageService,
  ) { }

  onMapReady() {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.deviceSvc.getDevicePosition().subscribe((res) => {
      this.deviceList = res;
      this.rows = res;
      this.setDeviceSummary();
    });
  }
  setDeviceSummary() {
    this.deviceSummary.total = this.deviceList.length
    this.deviceList.map((value: any, index: number) => {
      if (value.ignition == true) {
        this.deviceSummary.running = this.deviceSummary.running + 1
      }
      else {
        this.deviceSummary.idle = this.deviceSummary.idle + 1
      }
    })
  }

  onShowMap(value) {
    this.deviceSummary.lat = value.latitude
    this.deviceSummary.lng = value.longitude
    this.viewMap = true
    this.markers = [{
      lat: value.latitude,
      lng: value.longitude,
      label: 'S',
      draggable: false,
      title: value.name,
      www: ''
    }]
  }

  checkRule(filterQuery, item) {
    let match = {
      name: true,
      location: true,
      ignition: true
    }
    if (filterQuery.name) {
      match.name = item.name.toLowerCase().includes(filterQuery.name);
    }
    if (filterQuery.geoLocation) {
      match.location = item.geoLocation.toLowerCase().includes(filterQuery.geoLocation);
    }

    if (filterQuery.ignition !== null) {
      match.ignition = item.ignition == filterQuery.ignition;
    }
    return (match.name || match.location) && match.ignition;
  }

  onSetDeviceFilter(filterQuery) {
    const filteredRows = [];
    this.deviceList.forEach(item => {
      if (this.checkRule(filterQuery, item)) {
        filteredRows.push(item)
      }
    });
    this.rows = filteredRows;
  }

}
