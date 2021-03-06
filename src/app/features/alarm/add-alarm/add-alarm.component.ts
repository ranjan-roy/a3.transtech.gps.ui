import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { AlarmService } from "../../../services/alarm.service";
import * as moment from "moment";
@Component({
  selector: "app-add-alarm",
  templateUrl: "./add-alarm.component.html",
  styleUrls: ["./add-alarm.component.css"],
})
export class AddAlarmComponent implements OnInit, OnChanges {
  @Input() selectedAlarm;
  @Input() selectedDevice;
  @Input() alarmTypeList;
  @Input() operatorList;
  @Input() alarmStatusList;
  @Input() geofenceList;
  @Output() onAddEditComplete = new EventEmitter();

  formGroup: FormGroup;
  submitted = false;
  show = true;
  rowData: any = {
    deviceAlarmId: 0,
    deviceId: 0,
    alarmTypeId: 0,
    alarmText: "",
    value: 0,
    tolerance: 0,
    operatorId: 0,
    alarmStatus: 0,
    geofenceId: 0,
    startDate: new Date(),
    endDate: new Date(),
  };
  activeAlarmType = [1, 5, 6, 8, 10, 11, 4];
  fieldsState = {
    alarmText: false,
    value: false,
    operatorId: false,
    alarmStatus: false,
    startDate: false,
    endDate: false,
    geofenceId: false,
    tolerance: false,
  };

  deviceAlarmId: any;
  selectedDeviceId: any;
  deviceAlarmList: any;
  public mytime: Date = new Date();
  formSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private alarmSvc: AlarmService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {
    this.formSubmitted = false;
  }

  get alarmStatusListCalculated() {
    if (
      this.formGroup.value.alarmTypeId &&
      this.alarmTypeList.find(
        (x) => x.alarmTypeId == this.formGroup.value.alarmTypeId
      ).alarmGroupIdentifier
    ) {
      return this.alarmStatusList.filter(
        (x) =>
          x.alarmGroupIdentifier ==
          this.alarmTypeList.find(
            (x) => x.alarmTypeId == this.formGroup.value.alarmTypeId
          ).alarmGroupIdentifier
      );
    }
  }

  ngOnChanges() {
    this.createForm(this.selectedAlarm);
  }

  ngOnInit() {
    this.deviceAlarmId = 0;
    this.selectedDeviceId = this.selectedDevice.deviceId;
  }

  changeAlarmType(e, isManual) {
    if (!isManual) this.formGroup.reset();

    let val = parseInt(e);
    this.formGroup.get("alarmTypeId").setValue(val, {
      onlySelf: true,
    });
    if (this.activeAlarmType.includes(val)) {
      this.show = true;
    } else {
      this.show = false;
    }

    this.valueField.setValidators(null);
    this.alarmStatusField.setValidators(null);
    this.operatorIdField.setValidators(null);
    this.startDateField.setValidators(null);
    this.endDateField.setValidators(null);
    this.geofenceIdField.setValidators(null);
    this.toleranceField.setValidators(null);

    this.fieldsState.value = false;
    this.fieldsState.operatorId = false;
    this.fieldsState.geofenceId = false;
    this.fieldsState.alarmStatus = false;
    this.fieldsState.alarmText = false;
    this.fieldsState.startDate = false;
    this.fieldsState.endDate = false;
    this.fieldsState.tolerance = false;

    switch (val) {
      case 1:
        this.valueField.setValidators(Validators.required);
        this.operatorIdField.setValidators(Validators.required);
        this.operatorIdField.setValue(1);
        this.toleranceField.setValidators(Validators.required);
        this.fieldsState.value = true;
        this.fieldsState.tolerance = true;
        break;
      case 5:
      case 6:
        this.fieldsState.alarmStatus = true;
        this.alarmStatusField.setValidators(Validators.required);

        break;
      case 10:
        this.fieldsState.startDate = true;
        this.fieldsState.endDate = true;
        this.operatorIdField.setValidators(Validators.required);
        this.operatorIdField.setValue(4);
        this.startDateField.setValidators(Validators.required);
        this.endDateField.setValidators(Validators.required);
        break;
      case 4:
        this.fieldsState.geofenceId = true;
        this.fieldsState.alarmStatus = true;
        this.geofenceIdField.setValidators(Validators.required);
        this.alarmStatusField.setValidators(Validators.required);
        break;
    }
    this.updateValidity();
  }
  updateValidity() {
    this.valueField.updateValueAndValidity();
    this.alarmStatusField.updateValueAndValidity();
    this.operatorIdField.updateValueAndValidity();
    this.startDateField.updateValueAndValidity();
    this.endDateField.updateValueAndValidity();
    this.geofenceIdField.updateValueAndValidity();
    this.toleranceField.updateValueAndValidity();
  }

  changeOperatorId(e) {
    this.formGroup.get("operatorId").setValue(parseInt(e.target.value), {
      onlySelf: true,
    });
  }

  changeAlarmStatus(e) {
    this.formGroup.get("alarmStatus").setValue(parseInt(e.target.value), {
      onlySelf: true,
    });
  }
  changeGeofence(e) {
    this.formGroup.get("geofenceId").setValue(parseInt(e.target.value), {
      onlySelf: true,
    });
  }

  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
      alarmTypeId: [rowData.alarmTypeId, Validators.required],
      alarmText: [rowData.alarmText, Validators.required],
      value: [rowData.value],
      operatorId: [rowData.operatorId],
      alarmStatus: [rowData.alarmStatus],
      startDate: [rowData.startDate],
      endDate: [rowData.endDate],
      geofenceId: [rowData.geofenceId],
      tolerance: [rowData.tolerance],
    });

    if (rowData.alarmTypeId) {
      this.changeAlarmType(rowData.alarmTypeId, "manual");
    }
  }

  get valueField() {
    return this.formGroup.get("value") as FormControl;
  }
  get operatorIdField() {
    return this.formGroup.get("operatorId") as FormControl;
  }
  get alarmStatusField() {
    return this.formGroup.get("alarmStatus") as FormControl;
  }
  get startDateField() {
    return this.formGroup.get("startDate") as FormControl;
  }
  get endDateField() {
    return this.formGroup.get("endDate") as FormControl;
  }
  get form() {
    return this.formGroup.controls;
  }
  get geofenceIdField() {
    return this.formGroup.get("geofenceId") as FormControl;
  }
  get toleranceField() {
    return this.formGroup.get("tolerance") as FormControl;
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

    if (this.selectedAlarm.deviceAlarmId) {
      this.updateDeviceAlarm(this.formGroup.value);
    } else {
      this.addDeviceAlarm(this.formGroup.value);
    }
  }

  addDeviceAlarm(formValue) {
    const alarm = {
      geofenceId: formValue.geofenceId || 0,
      deviceAlarmId: this.selectedAlarm.deviceAlarmId || 0,
      deviceId: this.selectedDevice.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      alarmText: formValue.alarmText,
      value: parseInt(formValue.value),
      tolerance: parseInt(formValue.tolerance),
      operatorId: parseInt(formValue.operatorId),
      alarmStatus: parseInt(formValue.alarmStatus || 0),
      startDate: formValue.startDate || new Date(),
      endDate: formValue.endDate || new Date(),
    };
    this.alarmSvc.postAlarm(alarm).subscribe((newAlarm) => {
      if (newAlarm) {
        this._notificationSvc.success("Success", "Alarm added successfully");
        this.formGroup.reset();
        this.onAddEditComplete.emit(newAlarm);
      }
    });
  }

  updateDeviceAlarm(formValue) {
    const alarm = {
      deviceAlarmId: this.selectedAlarm.deviceAlarmId || 0,
      deviceId: this.selectedDevice.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      geofenceId: formValue.geofenceId || 0,
      alarmText: formValue.alarmText,
      value: parseInt(formValue.value),
      tolerance: parseInt(formValue.tolerance),
      operatorId: parseInt(formValue.operatorId),
      alarmStatus: parseInt(formValue.alarmStatus || 0),
      startDate: formValue.startDate ? moment(formValue.startDate).toISOString()  : new Date(),
      endDate: formValue.endDate ? moment(formValue.endDate).toISOString()  : new Date(),
    };

    this.alarmSvc.putAlarm(alarm.deviceAlarmId, alarm).subscribe((res) => {
      this._notificationSvc.success("Success", "Alarm updated successfully");
      this.formGroup.reset();
      this.formSubmitted = true;
      this.onAddEditComplete.emit(res);
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
