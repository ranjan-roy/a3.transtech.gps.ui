import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.css']
})
export class DashboardFilterComponent implements OnInit,OnChanges {
  @Input() deviceList: any[] = [];
  @Output() setDeviceFilter=new EventEmitter()
  searchText = "";
  filterBy = "Filter By"
  ignitionState = "Ignition";

  filterQuery = {
    ignition: null,
    geoLocation:"",
    name:""
  }
  
  constructor() { }
  ngOnChanges(){
    if(this.searchText){
      if(this.filterBy=="Filter By Name"){
        this.filterQuery.name=this.searchText
      }
      if(this.filterBy=="Filter By Address"){
        this.filterQuery.geoLocation=this.searchText
      }
      this.setDeviceFilter.emit(this.filterQuery)
    }
  }
  ngOnInit(): void {
  }
  setIgnitionState(state) {
    if(state==true){
      this.ignitionState = "Ignition On";
      this.filterQuery.ignition=true
    }
    else{
      this.ignitionState = "Ignition Off";
      this.filterQuery.ignition=false
    }
   
    
  }
  setFilterBy(state){
    if(state=="name"){
      this.filterBy="Filter By Name"
    }
    if(state=="geoLocation"){
      this.filterBy="Filter By Address"
    }

}
  
}
