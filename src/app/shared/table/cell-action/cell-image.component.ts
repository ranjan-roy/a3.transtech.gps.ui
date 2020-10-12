import { Component } from "@angular/core";

@Component({
  selector: 'app-image-formatter-cell',
  template: `<img border="0" width="60" height="50" src='assets/img/vehicleType/{{params.data.vehicleTypeId}}.svg'>` })

export class ImageFormatterComponent {
  params: any;
  agInit(params: any){
    this.params = params;
  } 
}