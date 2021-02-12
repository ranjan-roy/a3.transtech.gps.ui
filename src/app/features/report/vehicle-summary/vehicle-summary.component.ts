import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as actions from "../../../state/device/device.actions";
import * as deviceReducer from '../../../state/device/device.reducers';

@Component({
  selector: 'app-vehicle-summary',
  templateUrl: './vehicle-summary.component.html',
  styleUrls: ['./vehicle-summary.component.css']
})
export class VehicleSummaryComponent implements OnInit {
  deviceList: any;
  rows: any;

  constructor(private store: Store<any>) {
    this.store.pipe(select(deviceReducer.selectDevice)).subscribe(res => {
      if (res.devicePositions && res.devicePositions.length) {
        console.log(res);
        this.loadData(res.devicePositions);
      }
    })
  }

  ngOnInit(): void {
  }
  loadData(res) {
    this.deviceList = res;
    this.rows = res;
  }

  onSetDeviceFilter(filterQuery) {
    const filteredRows = [];
    this.deviceList.forEach((item) => {
      if (this.checkRule(filterQuery, item)) {
        filteredRows.push(item);
      }
    });
    console.log(filteredRows);

    this.rows = filteredRows;
  }

  checkRule(filterQuery, item) {
    let match = {
      name: false,
      isNameMatchRequired: !!filterQuery.name,
    };
    if (filterQuery.name) {
      match.name = item.name.toLowerCase().includes(filterQuery.name);
    }

    if (match.isNameMatchRequired) {
      return (match.isNameMatchRequired === match.name);
    }

    return (
      match.isNameMatchRequired === match.name
    );
  }

}
