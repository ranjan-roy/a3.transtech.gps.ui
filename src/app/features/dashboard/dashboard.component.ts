import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from ".././device/device.service";
import { Router } from "@angular/router";
import { StorageService } from "../../core/service/storage.service";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public deviceList = [];
  constructor(
    private deviceSvc: DeviceService,
    private storage: StorageService
  ) {}

 
  
  

  ngOnInit(): void {
    this.loadData();
   
  }
  loadData() {
   
    const userId = this.storage.getItem("");
    this.deviceSvc.getDevicePosition().subscribe((res) => {
      console.log(res);
      this.deviceList = res;
    });
  }

}
