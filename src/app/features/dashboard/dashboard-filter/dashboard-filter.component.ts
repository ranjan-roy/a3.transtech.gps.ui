import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit {
  @Input() deviceList: any[] = [];

  searchText = "";
  filterBy = "Filter By"
  ignitionState = "Ignition";

  filterQuery = {
    ignition: null
  }

  constructor() { }

  ngOnInit(): void {
  }
  setIgnitionState(state) {
    this.ignitionState = "Ignition On";
    this.ignitionState = "Ignition On"
  }

}
