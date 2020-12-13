import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  @Input() deviceinfo
  constructor() { }

  ngOnInit(): void {
  }

}
