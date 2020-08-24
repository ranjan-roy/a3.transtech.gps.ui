import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";

/** Demo Component for @angular/google-maps/map */
@Component({
  selector: "app-addfencing",
  templateUrl: "./addfencing.component.html",
  styleUrls: ["./addfencing.component.css"],
})
export class AddfencingComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  center = { lat: 24, lng: 12 };
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }
}
