import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-report-filter",
  templateUrl: "./report-filter.component.html",
  styleUrls: ["./report-filter.component.css"],
})
export class ReportFilterComponent {
  @Input() deviceList: any[] = [];
  @Output() setDeviceFilter = new EventEmitter();
  @Output() setDateRange = new EventEmitter();

  searchText = "";
  filterBy = "Filter By All";
  dateRange = "1";
  filterQuery = {
    name: "",
  };

  onChange(e): void {
    this.setDateRange.emit(e);
  }
  onSearchTextChanges($event) {
    this.triggerChange();
  }
  triggerChange() {
    if (this.searchText) {
      this.filterQuery.name = this.searchText.toLowerCase();
    }
    this.setDeviceFilter.emit({
      dateRange: parseInt(this.dateRange),
      ...this.filterQuery,
    });
  }
}
