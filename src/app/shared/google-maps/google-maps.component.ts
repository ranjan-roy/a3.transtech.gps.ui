import { Component } from "@angular/core";

@Component({
  selector: "app-google-maps",
  templateUrl: "google-maps.component.html",
  styleUrls: ["google-maps.component.css"],
})
export class GoogleMapsComponent {
  initMap() {
    var myLatlng = { lat: 12.965, lng: 77.595 };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: myLatlng,
    });

    // Create the initial InfoWindow.
    var infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });
    infoWindow.open(map);

    // Configure the click listener.
    map.addListener("click", function (mapsMouseEvent) {
      // Close the current InfoWindow.
      infoWindow.close();

      // Create a new InfoWindow.
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(mapsMouseEvent.latLng.toString());
      infoWindow.open(map);
    });
  }
}

// just an interface for type safety.
interface Marker {}
