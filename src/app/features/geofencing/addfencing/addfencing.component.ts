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
import { VendorService } from '../../vendor/vendor.service';
import { UserService } from '../../user/user.service';
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
  currentMap: google.maps.Map;
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
    address: "",
    geofenceId: 0,
    vendorId: 0,
    userId: 0,
    name: "",
    description: "",
    city: "",
    state: "",
    country: "",
    alias: "alias",
    geofenceTypeId: 0,
    polygon: {
      coordinates: [],
      srid: "",
    },
    srid: "",
    elevation: 0,
    mapParam: ""
  };
  addressText: string;
  vendorList: any;
  userList: any;
  mapParam: any;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private geofenceSvc: GeofencingService,
    private vendorSvc: VendorService,
    private userSvc: UserService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.rowData = navigation.extras.state;
    }

    this.mapParam = JSON.parse(this.rowData.mapParam);
    this.pointList = this.rowData.polygon.coordinates.map(x => ({ lat: x.latitude, lng: x.longitude }));
    this.createForm(this.rowData);
  }
  get form() {
    return this.a3FormGroup.controls;
  }
  ngOnInit() {
    this.vendorSvc.getAllVendor().subscribe((res) => {
      this.vendorList = res;
    });
  }

  changeVendor(e) {
    this.a3FormGroup.get('vendorId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });

    this.userSvc.getUsersByVendorId(this.a3FormGroup.value.vendorId).subscribe((res) => {
      this.userList = res;
    });
  }

  changeUser(e) {
    this.a3FormGroup.get('userId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  }

  onMapReady(map) {
    this.initDrawingManager(map);
    this.enableSearch(map);
  }

  initDrawingManager = (map: google.maps.Map) => {
    const self = this;
    let polygonCoords;

    if (this.rowData.polygon.coordinates.length) {
      const polygonCoords = this.rowData.polygon.coordinates.map(
        (item) => new google.maps.LatLng(item.latitude, item.longitude)
      );

      const myPolygon = new google.maps.Polygon({
        paths: polygonCoords,
        draggable: true, // turn off if it gets annoying
        editable: true,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
      });

      map.panTo(polygonCoords[0]);
      map.setZoom(this.mapParam.zoom);
      map.setCenter(new google.maps.LatLng(this.mapParam.lat, this.mapParam.lng));

      myPolygon.setMap(map);

      document.getElementById("deleteEdit").onclick = () => {
        myPolygon.setMap(null);
        this.pointList = [];
      };
    }
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        paths: polygonCoords,
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
        this.currentMap = map;
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
      // this.pointList = [];
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
      document.getElementById("autocomplete")
    );
    this.autocomplete.addListener("place_changed", (e) => {
      //get the place result
      let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
      this.fillInAddress(place);

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      } else {
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.zoom = 12;
        map.setCenter(place.geometry.location);
        map.setZoom(12);
      }
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder();

    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
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
    this.addressText = event.target.value;
  }

  fillInAddress(place) {
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
  saveSelectedShape() {
    const formValue = this.a3FormGroup.value;
    const payload = {
      ...this.rowData,
      name: formValue.name,
      vendorId: formValue.vendorId,
      userId: formValue.userId,
      country: formValue.country || "",
      state: formValue.state || "",
      city: formValue.city || "",
      polygon: {
        coordinates: [],
        srid: "",
      },
      description: formValue.description,
      elevation: 0,
      address: this.addressText,
      alias: "string",
      geofenceTypeId: 1,
      mapParam: `{"lat":${this.currentMap.getCenter().lat()}, "lng":${this.currentMap.getCenter().lng()}, "zoom":${this.currentMap.getZoom()}}`
      //mapParam: `lat:${this.currentMap.getCenter().lat()}/lng:${this.currentMap.getCenter().lng()}/zoom:${this.currentMap.getZoom()}`
    };

    if (this.selectedShape) {
      payload.polygon.coordinates = this.pointList.map((p) => {
        return {
          latitude: p.lat,
          longitude: p.lng,
        };
      });
      payload.polygon.coordinates.push(payload.polygon.coordinates[0]);

      if (this.rowData.geofenceId === 0) {
        this.addGeoFence(payload);
      } else {
        this.updateGeoFence(this.rowData.geofenceId, payload);
      }
    }
  }

  updateGeoFence(geofenceId, payload) {
    this.geofenceSvc
      .updateGeofence(geofenceId, payload)
      .subscribe((geofence) => {
        if (geofence) {
          this._notificationSvc.success(
            "Success",
            "Geofence Added to Group  successfully"
          );
          this.router.navigate(["/Geofencing"]);
        }
      });
  }

  addGeoFence(payload) {
    this.geofenceSvc.postGeofence(payload).subscribe((geofence) => {
      if (geofence) {
        this._notificationSvc.success(
          "Success",
          "Geofence Added to Group  successfully"
        );
        this.router.navigate(["/Geofencing"]);
      }
    });
  }

  createForm(rowData) {
    this.a3FormGroup = this.formBuilder.group({
      name: [rowData.name, [Validators.required]],
      vendorId: [rowData.vendorId, [Validators.required]],
      userId: [rowData.userId, [Validators.required]],
      description: [rowData.description],
      city: [rowData.city],
      state: [rowData.state],
      country: [rowData.country],
    });

    if (this.a3FormGroup.value.vendorId) {
      this.userSvc.getUsersByVendorId(this.a3FormGroup.value.vendorId).subscribe((res) => {
        this.userList = res;
      });
    }
  }
}
