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
import { AlarmService } from "../alarm.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";

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
    operatorId: 0,
    alarmStatus: 0,
    startDate: new Date(),
    endDate: new Date(),
  };
  activeAlarmType = [1, 5, 6, 10];
  fieldsState = {
    alarmText: false,
    value: false,
    operatorId: false,
    alarmStatus: false,
    startDate: false,
    endDate: false,
  };

  deviceAlarmId: any;
  selectedDeviceId: any;
  deviceAlarmList: any;
  public mytime: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private alarmSvc: AlarmService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnChanges() {
    this.createForm(this.selectedAlarm);
  }

  ngOnInit() {
    this.deviceAlarmId = 0;
    this.selectedDeviceId = this.selectedDevice.deviceId;
  }

  changeAlarmType(e) {
    let val = parseInt(e);
    console.log(e);

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

    this.fieldsState.value = false;
    this.fieldsState.operatorId = false;
    this.fieldsState.alarmStatus = false;
    this.fieldsState.alarmText = false;
    this.fieldsState.startDate = false;
    this.fieldsState.endDate = false;

    switch (e) {
      case 1:
        this.valueField.setValidators(Validators.required);
        this.operatorIdField.setValidators(Validators.required);
        this.fieldsState.value = true;
        this.fieldsState.operatorId = true;
        break;
      case 5:
      case 6:
        this.fieldsState.alarmStatus = true;
        this.alarmStatusField.setValidators(Validators.required);

        break;
      case 10:
        this.fieldsState.operatorId = true;
        this.fieldsState.startDate = true;
        this.fieldsState.endDate = true;
        this.operatorIdField.setValidators(Validators.required);
        this.startDateField.setValidators(Validators.required);
        this.endDateField.setValidators(Validators.required);
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

  createForm(rowData) {
    this.formGroup = this.formBuilder.group({
      alarmTypeId: [rowData.alarmTypeId, Validators.required],
      alarmText: [rowData.alarmText, Validators.required],
      value: [rowData.value],
      operatorId: [rowData.operatorId],
      alarmStatus: [rowData.alarmStatus],
      startDate: [rowData.startDate],
      endDate: [rowData.endDate],
    });
    console.log(rowData);

    if (rowData.alarmTypeId) {
      this.changeAlarmType(rowData.alarmTypeId);
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
      deviceAlarmId: this.selectedAlarm.deviceAlarmId || 0,
      deviceId: this.selectedDevice.deviceId,
      alarmTypeId: formValue.alarmTypeId,
      alarmText: formValue.alarmText,
      value: parseInt(formValue.value),
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
      alarmText: formValue.alarmText,
      value: parseInt(formValue.value),
      operatorId: parseInt(formValue.operatorId),
      alarmStatus: parseInt(formValue.alarmStatus || 0),
      startDate: formValue.startDate || new Date(),
      endDate: formValue.endDate || new Date(),
    };

    this.alarmSvc.putAlarm(alarm.deviceAlarmId, alarm).subscribe((res) => {
      this._notificationSvc.success("Success", "Alarm updated successfully");
      this.formGroup.reset();
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
