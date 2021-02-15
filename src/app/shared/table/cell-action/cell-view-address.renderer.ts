import { Component } from "@angular/core";

@Component({
  selector: "app-view-address-renderer",
  templateUrl: "./cell-view-cellrenderer.html",
})
export class CellViewAddressRendererComponent {
  params: any;
  agInit(params: any) {
    this.params = params;
  }
  onBtnClick(item) {
    alert("item");
  }
}
