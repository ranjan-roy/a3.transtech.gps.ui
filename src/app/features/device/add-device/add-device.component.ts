import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { DeviceService } from "../device.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { VendorService } from '../../vendor/vendor.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.component.html",
  styleUrls: ["./add-device.component.css"],
})
export class AddDeviceComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  rowData: any = {
    deviceId: null,
    serial: "",
    name: "",
  };

  deviceId: any;
  vendorList: any;
  userList: any;
  vehicleTypeList: any;
  deviceTypeList: any;

  constructor(
    private formBuilder: FormBuilder,
    private deviceSvc: DeviceService,
    private vendorSvc: VendorService,
    private userSvc: UserService,
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

  ngOnInit() {
    this.vendorSvc.getAllVendor().subscribe((res) => {
      this.vendorList = res;
    });

    this.deviceSvc.getAllVehicleType().subscribe((res) => {
      this.vehicleTypeList = res;
    });

    this.deviceSvc.getAllDeviceType().subscribe((res) => {
      this.deviceTypeList = res;
    });
    
  }

  changeVendor(e) {
    this.formGroup.get('vendorId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  
    this.userSvc.getUsersByVendorId(this.formGroup.value.vendorId).subscribe((res) => {
      console.log(res)
      this.userList = res;
    });
  }

  changeVehicleType(e) {
    this.formGroup.get('vehicleTypeId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  }

  changeDeviceType(e) {
    this.formGroup.get('deviceTypeId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
    console.log(e.target.value);
    console.log(this.formGroup.get('deviceTypeId'));
  }

  changeUser(e) {
    this.formGroup.get('userId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  }

  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
      vendorId: this.rowData?.deviceId ? [{value: rowData.vendorId?.toString(), disabled: true}, Validators.required]: [rowData.vendorId?.toString(), Validators.required],
      userId: this.rowData?.deviceId ? [{value: rowData.userId?.toString(), disabled: true}, Validators.required]: [rowData.userId?.toString(), Validators.required],
      vehicleTypeId: [rowData.vehicleTypeId, Validators.required],
      deviceTypeId: [rowData.deviceTypeId, Validators.required],
      serial: [rowData.serial, Validators.required],
      name: [rowData.name, Validators.required],
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  onReset() {
    this.submitted = false;
    this.formGroup.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      this.validateAllFormFields(this.formGroup);
      return;
    }
    if (this.rowData.deviceId) {
      this.updateDevice(this.formGroup.value);
    } else {
      this.addUserDevice(this.formGroup.value);
    }
  }

  addUserDevice(formValue) {
    const device = {
      vendorId: formValue.vendorId,
      userId: formValue.userId,
      vehicleTypeId: formValue.vehicleTypeId,
      deviceTypeId: formValue.deviceTypeId,
      serial: formValue.serial,
      name: formValue.name,
      deviceId: 0,
    };

    this.deviceSvc.addDevice(device).subscribe((newDevice) => {
      if (newDevice) {
        this._notificationSvc.success("Success", "Device added successfully");
        this.router.navigate(["/Device"]);
      }
    });
  }

  updateDevice(formValue) {
    const device = {
      ...this.rowData,
      deviceId: this.rowData.deviceId,
      vehicleTypeId: this.rowData.vehicleTypeId,
      deviceTypeId: this.rowData.deviceTypeId,
      serial: formValue.serial,
      name: formValue.name,
    };
    this.deviceSvc.updateDevice(device).subscribe((res) => {
      this._notificationSvc.success("Success", "Device updated successfully");
      this.formGroup.reset();
      this.router.navigate(["/Device"]);
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}