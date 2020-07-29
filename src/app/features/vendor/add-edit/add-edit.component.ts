import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../vendor.service';
import { NotificationService } from '../../../core/service/notification.server';



@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  vendorForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private vendorSvc: VendorService, protected _notificationSvc: NotificationService) { }

  ngOnInit() {
    this.vendorForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(10)]],
      mobile: ['', [Validators.maxLength(10)]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get form() { return this.vendorForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.vendorForm.invalid) {
      return;
    }
    this.submitVendor(this.vendorForm.value)
  }

  onReset() {
    this.submitted = false;
    this.vendorForm.reset();
  }
  submitVendor(formValue) {
    const vendor = {
      "code": formValue.code,
      "name": formValue.name,
      "description": formValue.description,
      "mail": formValue.email,
      "phone": formValue.phone,
      "mobile": formValue.mobile,
    }
    this.vendorSvc.addVendor(vendor).subscribe(v => {
      if (v) {
        console.log(v);
        this.vendorSvc.addProfile({
          "name": v['name'],
          "description": v['description'],
          "vendorId": v['vendorId'],
          "profileId": 0,
        }).subscribe(profile => {
          if (profile) {
            this.vendorSvc.addUser({
              "name": v['name'],
              "vendorId": v['vendorId'],
              "accessLevel": 2,
              "profileId": profile['profileId'],
              "userName": formValue.userName,
              "password": formValue.password,
              "email": v['mail'],
              "phone": v['phone'],
              "userId": 0
            }).subscribe(profile => {
              this._notificationSvc.success('Success', "Vendor added successfully");
              this.vendorForm.reset();
            });
          }
        });
      }
    });
  }
}


