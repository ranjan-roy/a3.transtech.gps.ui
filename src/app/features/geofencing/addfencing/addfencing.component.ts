import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import { GeofencingService } from "../geofencing.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
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
  address: any = {};
  placeSearch: any;
  componentForm: {
    street_number: "short_name";
    route: "long_name";
    locality: "long_name";
    administrative_area_level_1: "short_name";
    country: "long_name";
    postal_code: "short_name";
  };

  autocomplete: google.maps.places.Autocomplete;
  map: any;
  a3FormGroup: FormGroup;
  submitted = false;
  rowData: any = {
    name: "",
    description: "",
    city: "",
    state: "",
    country: "",
    geofenceId: 1,
    alias: "alias",
    geofenceTypeId: 1,
    polygon: {
      coordinates: [],
      srid: "",
    },
    srid: "",
    elevation: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private geofenceSvc: GeofencingService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      console.log(navigation.extras.state);

      this.rowData = navigation.extras.state;
    }
    this.createForm(this.rowData);
  }
  get form() {
    return this.a3FormGroup.controls;
  }
  ngOnInit() {
    this.setCurrentPosition();
  }

  onMapReady(map) {
    this.initDrawingManager(map);
    this.enableSearch(map);
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
    const formValue = this.a3FormGroup.value;
    const payload = {
      geofenceId: 1,
      alias: "alias",
      name: formValue.name,
      country: formValue.country || "",
      state: formValue.state || "",
      city: formValue.city || "",
      geofenceTypeId: 1,
      polygon: {
        coordinates: this.pointList,
        srid: "",
      },
      srid: "",
      description: formValue.description,
      elevation: 0,
    };

    if (this.selectedShape) {
      payload.polygon.coordinates.push(this.pointList[0]);
      this.geofenceSvc.postGeofence(payload).subscribe((geofence) => {
        if (geofence) {
          this._notificationSvc.success(
            "Success",
            "Geofence Added to Group  successfully"
          );
          this.getGroupId(geofence);
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

  enableSearch(map) {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        types: ["geocode"],
      }
    );

    this.autocomplete.setFields(["address"]);
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.

    this.autocomplete.addListener("place_changed", () => {
      this.fillInAddress();
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        google.maps.setCenter(place.geometry.location);
        google.maps.setZoom(17);
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

  fillInAddress() {
    const place = this.autocomplete.getPlace();
    console.log(place.address_components);
    for (let component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      const addressType = component.types[0];

      this.address[addressType] = component["short_name"];
    }
    this.a3FormGroup.patchValue({
      country: this.address.country || "",
      state: this.address.administrative_area_level_1 || "",
      city: this.address.administrative_area_level_2 || "",
    });
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  getGroupId(fence) {
    const userId = this.storage.getItem("userId");
    this.geofenceSvc.getGroupIdByUser(userId).subscribe((group) => {
      if (group && group.length) {
        this._notificationSvc.success(
          "Success",
          "Group Id Fetched successfully"
        );
        this.addDeviceToUserGroup(fence, group[0]);
      }
    });
  }

  addDeviceToUserGroup(fence, group) {
    console.log(fence, group);
    this.geofenceSvc
      .addGeofenceToGroup({
        geofenceId: fence.geofenceId,
        groupId: group.groupId,
      })
      .subscribe((usergroup) => {
        if (usergroup) {
          this._notificationSvc.success(
            "Success",
            "Geofence Added to Group  successfully"
          );
          this.router.navigate(["/geofencing"]);
        }
      });
  }

  createForm(rowData) {
    this.a3FormGroup = this.formBuilder.group({
      name: [rowData.name, [Validators.required]],
      description: [rowData.description],
      city: [rowData.city],
      state: [rowData.state],
      country: [rowData.country],
    });
  }
}
