import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";

/** Demo Component for @angular/google-maps/map */
@Component({
  selector: "app-addfencing",
  templateUrl: "./addfencing.component.html",
  styleUrls: ["./addfencing.component.css"],
})
export class AddfencingComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  // center = { lat: 22, lng: 79 };
  // markerOptions = { draggable: false };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // zoom = 5;
  // display?: google.maps.LatLngLiteral;
  myPolygon: any;

  // addMarker(event: google.maps.MouseEvent) {
  //   this.markerPositions.push(event.latLng.toJSON());
  // }

  // move(event: google.maps.MouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  // removeLastMarker() {
  //   this.markerPositions.pop();
  // }

  getPolygonCoords() {
    var len = this.myPolygon.getPath().getLength();
    var htmlStr = "";
    for (var i = 0; i < len; i++) {
      htmlStr +=
        "new google.maps.LatLng(" +
        this.myPolygon.getPath().getAt(i).toUrlValue(5) +
        "), ";
      //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
      //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
    }
    document.getElementById("info").innerHTML = htmlStr;
  }

  initMap() {
    // Map Center
    var myLatLng = new google.maps.LatLng(33.5190755, -111.9253654);
    // General Options
    var mapOptions = {
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(
      document.getElementById("map-canvas"),
      mapOptions
    );
    // Polygon Coordinates
    var triangleCoords = [
      new google.maps.LatLng(33.5362475, -111.9267386),
      new google.maps.LatLng(33.5104882, -111.9627875),
    ];
    // Styling & Controls
    var myPolygon = new google.maps.Polygon({
      paths: triangleCoords,
      draggable: true, // turn off if it gets annoying
      editable: true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });

    myPolygon.setMap(map);
    //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
    google.maps.event.addListener(
      myPolygon.getPath(),
      "insert_at",
      this.getPolygonCoords
    );
    //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
    google.maps.event.addListener(
      myPolygon.getPath(),
      "set_at",
      this.getPolygonCoords
    );
  }

  ngOnInit() {
    this.initMap();
  }
}
