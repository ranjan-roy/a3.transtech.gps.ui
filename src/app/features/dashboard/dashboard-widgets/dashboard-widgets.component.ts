import { Component, Input, OnInit } from '@angular/core';
import { DeviceSummary } from '../dashboard.constant';

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.css']
})
export class DashboardWidgetsComponent implements OnInit {
  @Input() deviceSummary: DeviceSummary = {
    online: 0,
    running: 0,
    idle: 0,
    stopped: 0,
    nodata:0,
    ignition: 0,
    inactive: 0,
    total: 0,
    lat: 0,
    lng: 0,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
