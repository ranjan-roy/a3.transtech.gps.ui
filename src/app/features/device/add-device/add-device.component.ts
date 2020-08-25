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
    name: ""
    
   
  };
  deviceId: any;

  constructor(
    private formBuilder: FormBuilder,
    private deviceSvc: DeviceService,
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
    
  }

  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
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
      serial: formValue.serial,
      name: formValue.name,
      deviceId: 0,
    };
    
    this.deviceSvc
      .addDevice(
       device
      )
      .subscribe((newDevice) => {
        if (newDevice) {
          this._notificationSvc.success("Success", "User updated successfully");
          this.getGroupId(newDevice);
        }

      });
  }

  updateDevice(formValue) {
    const device = {
      ...this.rowData,
      deviceId: this.rowData.deviceId,
      serial: formValue.serial,
      name: formValue.name,
      
    };
    this.deviceSvc.updateDevice(device).subscribe((res) => {
      this._notificationSvc.success("Success", "Device updated successfully");
      this.formGroup.reset();
      this.router.navigate(["/device"]);
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

  getGroupId(device) {
    const userId = this.storage.getItem("userId");
    this.deviceSvc.getGroupIdByUser(userId).subscribe((group) => {
      if (group && group.length) {
        this._notificationSvc.success("Success", "Group Id Fetched successfully");
        this.addDeviceToUserGroup(device, group[0]);
      }
    });
  }

  addDeviceToUserGroup(device, group) {
    console.log(device,group)
    this.deviceSvc
      .addDeviceGroup({"deviceId": device.deviceId, "groupId": group.groupId})
      .subscribe((usergroup) => {
        if (usergroup) {
          this._notificationSvc.success(
            "Success",
            "Device Added to Group  successfully"
          );
          this.formGroup.reset();
          this.router.navigate(["/device"]);
        }
      });
  }
}
