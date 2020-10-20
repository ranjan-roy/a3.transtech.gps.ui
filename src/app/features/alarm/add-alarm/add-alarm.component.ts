import { Component, Input, OnInit,OnChanges } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AlarmService } from "../alarm.service";
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
export class AddAlarmComponent implements OnInit,OnChanges {
  @Input() selectedAlarm
  @Input() selectedDevice
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

  deviceAlarmId: any;
  selectedDeviceId: any;
  deviceAlarmList: any;
  alarmTypeList: any;
  operatorList: any;
  alarmStatusList: any;


  constructor(
    private formBuilder: FormBuilder,
    private alarmSvc: AlarmService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {
  }

  ngOnChanges() {
    this.createForm(this.selectedAlarm);
  }

  ngOnInit() {
    this.deviceAlarmId = 0;
    this.selectedDeviceId = this.selectedDevice.deviceId;
    this.alarmSvc.getDeviceAlarmByDeviceId(this.selectedDevice.deviceId).subscribe((res) => {
      this.alarmTypeList = res;
    });
    this.alarmSvc.getOperator().subscribe((res) => {
      this.operatorList = res;
    });
    this.alarmSvc.getAlarmStatus().subscribe((res) => {
      this.alarmStatusList = res;

    });    
  }

  changeAlarmType(e) {
    this.formGroup.get('alarmTypeId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
  
    this.alarmSvc.getDeviceAlarmByDeviceId(this.selectedDevice.deviceId).subscribe((res) => {
      this.alarmTypeList = res;
    });
  }

  changeOperatorId(e) {
    this.formGroup.get('operatorId').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
    this.alarmSvc.getOperator().subscribe((res) => {
      this.operatorList = res;
    });
  }

  changeAlarmStatus(e) {
    this.formGroup.get('alarmStatus').setValue(parseInt(e.target.value), {
      onlySelf: true
    });
    this.alarmSvc.getAlarmStatus().subscribe((res) => {
      this.alarmStatusList = res;
    });
  }


  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
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
      deviceAlarmId: this.selectedAlarm.deviceAlarmId || 0,
      deviceId: this.selectedDevice.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      alarmText: formValue.alarmText,
      value: formValue.value,
      operatorId: formValue.operatorId,
      alarmStatus: formValue.alarmStatus,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
    };
    this.alarmSvc.postAlarm(alarm).subscribe((newAlarm) => {
      if (newAlarm) {
        this._notificationSvc.success("Success", "Alarm added successfully");
        this.router.navigate(["/Alarm"]);
      }
    });
  }

  updateDeviceAlarm(formValue) {
    const alarm = {
      deviceAlarmId: this.selectedAlarm.deviceAlarmId,
      deviceId: this.selectedDevice.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      alarmText: this.rowData.alarmText,
      value: this.rowData.value,
      operatorId: this.rowData.operatorId,
      alarmStatus: this.rowData.alarmStatus,
      startDate: this.rowData.startDate,
      endDate: this.rowData.endDate,
    };
    this.alarmSvc.putAlarm(alarm.deviceId, alarm).subscribe((res) => {
      this._notificationSvc.success("Success", "Alarm updated successfully");
      this.formGroup.reset();
      this.router.navigate(["/Alarm"]);
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