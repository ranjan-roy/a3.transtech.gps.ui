import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from ".././device/device.service";
import { Router } from "@angular/router";
import { StorageService } from "../../core/service/storage.service";
import { GeofencingService } from '../geofencing/geofencing.service';

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
  viewMap:boolean=false
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
      console.log(res);
      this.deviceList = res;
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
  onShowMap(value){
    this.deviceSummary.lat = value.latitude
    this.deviceSummary.lng = value.longitude
    this.viewMap=true
    this.markers=[{
      lat: value.latitude,
      lng: value.longitude,
      label: 'S',
      draggable: false,
      title: value.name,
      www: ''
    }]
}
  

}
