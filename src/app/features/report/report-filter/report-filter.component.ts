import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-report-filter",
  templateUrl: "./report-filter.component.html",
  styleUrls: ["./report-filter.component.css"],
})
export class ReportFilterComponent implements OnInit {
  @Input() deviceList: any[] = [];
  @Output() setDeviceFilter = new EventEmitter();
  searchText = "";
  filterBy = "Filter By All";
  ignitionState = "Ignition";
  dateRange = "1";

  filterQuery = {
    ignition: null,
    geoLocation: "",
    name: "",
  };

  constructor() {}

  ngOnInit(): void {}
  onSearchTextChanges($event) {
    if (this.searchText) {
      this.filterQuery.name = this.searchText.toLowerCase();
      this.setDeviceFilter.emit(this.filterQuery);
    } else {
      this.setDeviceFilter.emit({
        ...this.filterQuery,
      });
    }
  }
}
