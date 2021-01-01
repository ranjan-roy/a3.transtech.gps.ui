import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-vehicle-info",
  templateUrl: "./vehicle-info.component.html",
  styleUrls: ["./vehicle-info.component.css"],
})
export class VehicleInfoComponent implements OnInit {
  @Input() deviceList;
  @Output() showMap = new EventEmitter();
  deviceinfo: any;
  constructor() {}

  ngOnInit(): void {}
  viewMap(deviceinfo) {
    this.showMap.emit(deviceinfo);
  }
}
