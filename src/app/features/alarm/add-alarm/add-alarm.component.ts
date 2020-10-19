import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { DeviceService } from "../alarm.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { VendorService } from '../../vendor/vendor.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: "app-add-alarm",
  templateUrl: "./add-alarm.component.html",
  styleUrls: ["./add-alarm.component.css"],
})
export class AddAlarmComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  rowData: any = {
    deviceAlarmId: null,
    deviceId: null,
    alarmTypeId: null,
    alarmText: "",
    value: null,
    operatorId: null,
    alarmStatus: null,
    startDate: "",
    endDate: ""  
  };

  deviceId: any;
  deviceAlarmId: any;
  deviceAlarmList: any;
  alarmTypeList: any;
  operatorList: any;
  alarmStatusList: any;

  constructor(
    private formBuilder: FormBuilder,
    private deviceSvc: DeviceService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.rowData = navigation.extras.state;
      console.log('-=-=>',this.rowData);
      
    }
    this.createForm(this.rowData);
  }

  ngOnInit() {
    this.deviceId = this.rowData[0].deviceId;
    this.deviceAlarmId = 0;
    this.deviceSvc.getDeviceAlarmByDeviceId(this.deviceId).subscribe((res) => {
      console.log("alarmtypeid==>",res)
      this.alarmTypeList = res;
    });

    this.deviceSvc.getOperator().subscribe((res) => {
      console.log("operator==>",res)
      this.operatorList = res;
    });

    this.deviceSvc.getAlarmStatus().subscribe((res) => {
      console.log("alarmstatus==>",res)
      this.alarmStatusList = res;
    });
    
  }

  changeDeviceAlarm(e) {
    this.formGroup.get('deviceAlarmId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  }

  changeAlarmType(e) {
    this.formGroup.get('alarmTypeId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  
    this.deviceSvc.getDeviceAlarmByDeviceId(this.deviceId).subscribe((res) => {
      this.alarmTypeList = res;
    });
  }

  changeOperatorId(e) {
    this.formGroup.get('operatorId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
    this.deviceSvc.getOperator().subscribe((res) => {
      this.operatorList = res;
    });
  }

  changeAlarmStatus(e) {
    this.formGroup.get('alarmStatus').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
    this.deviceSvc.getAlarmStatus().subscribe((res) => {
      this.alarmStatusList = res;
    });
  }


  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
      deviceAlarmId: this.rowData?.deviceId ? [{value: rowData.deviceAlarmId, disabled: true}, Validators.required]: [rowData.deviceAlarmId, Validators.required],
      deviceId: [rowData[0].deviceId],
      alarmTypeId: [rowData.alarmTypeId, Validators.required],
      alarmText: [rowData.alarmText, Validators.required],
      value: [rowData.value, Validators.required],
      operatorId: [rowData.operatorId, Validators.required],
      alarmStatus: [rowData.alarmStatus, Validators.required],
      startDate: [rowData.startDate, Validators.required],
      endDate: [rowData.endDate, Validators.required],
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
      this.updateDeviceAlarm(this.formGroup.value);
    } else {
      this.addDeviceAlarm(this.formGroup.value);
    }
  }

  addDeviceAlarm(formValue) {
    const alarm = {
      deviceAlarmId: formValue.deviceAlarmId,
      deviceId: formValue.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      alarmText: formValue.alarmText,
      value: formValue.value,
      operatorId: formValue.operatorId,
      alarmStatus: formValue.alarmStatus,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
    };
    console.log("added field ==>>", formValue);
    

    // this.deviceSvc.addDeviceAlarm(device).subscribe((newDevice) => {
    //   if (newDevice) {
    //     this._notificationSvc.success("Success", "Alarm added successfully");
    //     this.router.navigate(["/Alarm"]);
    //   }
    // });
  }

  updateDeviceAlarm(formValue) {
    const alarm = {
      ...this.rowData,
      deviceId: this.rowData.deviceId,
      alarmTypeId: this.rowData.alarmTypeId,
      alarmText: this.rowData.alarmText,
      operatorId: this.rowData.operatorId,
      alarmStatus: formValue.alarmStatus,
    };
    // this.deviceSvc.updateDeviceAlarm(device).subscribe((res) => {
    //   this._notificationSvc.success("Success", "Alarm updated successfully");
    //   this.formGroup.reset();
    //   this.router.navigate(["/Alarm"]);
    // });
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