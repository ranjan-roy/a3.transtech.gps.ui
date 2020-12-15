import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  @Input() deviceinfo
  
  @Output() showMap=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  viewMap(){
    this.showMap.emit(this.deviceinfo)
   }

}
