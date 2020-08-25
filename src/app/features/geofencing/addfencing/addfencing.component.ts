import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import { GeofencingService } from "../geofencing.service";
declare const google: any;

/** Demo Component for @angular/google-maps/map */
@Component({
  selector: "app-addfencing",
  templateUrl: "./addfencing.component.html",
  styleUrls: ["./addfencing.component.css"],
})
export class AddfencingComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;

  lat = 20.5937;
  lng = 78.9629;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;
  zoom;
  private geoCoder;
  address: string;
  placeSearch: any;

  componentForm: {
    street_number: "short_name";
    route: "long_name";
    locality: "long_name";
    administrative_area_level_1: "short_name";
    country: "long_name";
    postal_code: "short_name";
  };

  constructor(private ngZone: NgZone, private geofenceSvc: GeofencingService) {}

  ngOnInit() {
    this.setCurrentPosition();
  }

  onMapReady(map) {
    this.initDrawingManager(map);
    this.enableSearch();
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      "overlaycomplete",
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(paths.getAt(p), "set_at", () => {
              if (!event.overlay.drag) {
                self.updatePointList(event.overlay.getPath());
              }
            });
            google.maps.event.addListener(paths.getAt(p), "insert_at", () => {
              self.updatePointList(event.overlay.getPath());
            });
            google.maps.event.addListener(paths.getAt(p), "remove_at", () => {
              self.updatePointList(event.overlay.getPath());
            });
          }
          self.updatePointList(event.overlay.getPath());
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });

          // set selected shape object
          const newShape = event.overlay;
          newShape.type = event.type;
          this.setSelection(newShape);
        }
      }
    );
  };
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  clearSelection() {
    if (this.selectedShape) {
      this.selectedShape.setEditable(false);
      this.selectedShape = null;
      this.pointList = [];
    }
  }
  setSelection(shape) {
    this.clearSelection();
    this.selectedShape = shape;
    shape.setEditable(true);
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  saveSelectedShape() {
    const payload = {
      geofenceId: 1,
      alias: "alias",
      name: "name",
      country: "India",
      state: "state",
      city: "city",
      geofenceTypeId: 1,
      polygon: {
        coordinates: this.pointList,
      },
    };

    if (this.selectedShape) {
      console.log("Co-ordinates", this.pointList);
      this.geofenceSvc.postGeofence(payload).subscribe((geofenceId) => {
        if (geofenceId) {
          console.log("Coordinates Added");
        }
      });
    }
  }

  updatePointList(path) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
  }

  enableSearch() {
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["geocode"],
      }
    );

    autocomplete.setFields(["address"]);

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder();

    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  onAddressSelect(event) {
    const str = console.log("address", event);
  }
}
