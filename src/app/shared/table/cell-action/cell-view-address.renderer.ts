import { Component } from "@angular/core";
import { DeviceService } from "../../../services/device.service";

@Component({
  selector: "app-view-address-renderer",
  styles: [
    `
      .address {
        font-size: 10px;
        color: #000;
        font-weight: bold;
      }
    `,
  ],
  templateUrl: "./cell-view-cellrenderer.html",
})
export class CellViewAddressRendererComponent {
  params: any;
  address: string = null;
  loading = false;
  error = false;
  constructor(private deviceSvc: DeviceService) {}
  agInit(params: any) {
    this.params = params;
  }
  onBtnClick(item) {
    this.loading = true;
    this.error = false;
    this.address = null;
    this.deviceSvc
      .GetPositionAddress({ lat: item.latitude, lng: item.longitude })
      .subscribe((res) => {
        if (res.results && res.results.length) {
          this.loading = false;
          this.address = res.results[0].formatted_Address;
        } else {
          this.error = true;
        }
      });
  }
}
