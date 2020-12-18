import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit {
  @Input() deviceList: any[] = [];
  @Output() setDeviceFilter = new EventEmitter()
  searchText = "";
  filterBy = "Filter By All"
  ignitionState = "Ignition";

  filterQuery = {
    ignition: null,
    geoLocation: "",
    name: ""
  }

  constructor() { }

  onSearchTextChanges($event) {
    if (this.searchText) {
      if (this.filterBy == "Filter By Name") {
        this.filterQuery.name = this.searchText.toLowerCase()
      } else if (this.filterBy == "Filter By Address") {
        this.filterQuery.geoLocation = this.searchText.toLowerCase()
      } else {
        this.filterQuery.name = this.searchText.toLowerCase()
        this.filterQuery.geoLocation = this.searchText.toLowerCase()
      }
      this.setDeviceFilter.emit(this.filterQuery)
    }
  }

  ngOnInit(): void {
  }

  setIgnitionState(state) {
    if (state == true) {
      this.ignitionState = "Ignition On";
      this.filterQuery.ignition = true
    } else if (state == false) {
      this.ignitionState = "Ignition Off";
      this.filterQuery.ignition = false
    } else {
      this.ignitionState = "Ignition";
      this.filterQuery.ignition = null;
    }
    this.setDeviceFilter.emit(this.filterQuery)
  }

  setFilterBy(state) {
    if (state == "name") {
      this.filterBy = "Filter By Name";
      this.filterQuery.name = this.searchText.toLowerCase()
      this.filterQuery.geoLocation = '';
    } else if (state == "geoLocation") {
      this.filterBy = "Filter By Address"
      this.filterQuery.name = '';
      this.filterQuery.geoLocation = this.searchText.toLowerCase()
    } else {
      this.filterBy = "Filter By All"
      this.filterQuery.name = this.searchText;
      this.filterQuery.geoLocation = this.searchText.toLowerCase()
    }
    this.setDeviceFilter.emit(this.filterQuery)
  }
}
