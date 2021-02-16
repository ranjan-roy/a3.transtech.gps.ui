import { Component } from "@angular/core";
import { DeviceService } from "../../../services/device.service";

@Component({
  selector: "app-view-address-renderer",
  styles: [`
  .address {
      fill: #ff9933;
  }
`],
  templateUrl: "./cell-view-cellrenderer.html",
})
export class CellViewAddressRendererComponent {
  params: any;
  address: string = null;
  /**
   *
   */
  constructor(private deviceSvc: DeviceService) {


  }
  agInit(params: any) {
    this.params = params;
  }
  onBtnClick(item) {
    console.log(item);
    this.address = "Deb Bhawan, Road Number 1, Ram Nagar, Agartala, Tripura. 69 m from Seva Medical Hall pin-799002 (India)";
    // this.deviceSvc.GetPositionAddress({ lat: item.latitude, lng: item.longitude }).subscribe(res => {
    //   if (res.results && res.results.length) {
    //     this.address = res.results[0].formatted_Address;
    //   }
    // })
  }
}
