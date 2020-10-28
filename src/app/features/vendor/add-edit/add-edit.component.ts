import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { VendorService } from "../vendor.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.css"],
})
export class AddEditComponent implements OnInit {
  vendorForm: FormGroup;
  submitted = false;
  rowData: any = {
    vendorId: null,
    code: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    mobile: "",
    userName: "",
    password: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private vendorSvc: VendorService,
    protected _notificationSvc: NotificationService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      console.log(navigation.extras.state);

      this.rowData = navigation.extras.state;
    }
    this.createForm(this.rowData);
  }

  ngOnInit() { }
  createForm(rowData) {
    this.vendorForm = this.formBuilder.group({
      code: [rowData.code, Validators.required],
      name: [rowData.name, Validators.required],
      description: [rowData.description],
      email: [rowData.mail, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: [rowData.phone, [Validators.required, Validators.maxLength(10)]],
      mobile: [rowData.mobile, [Validators.required, Validators.maxLength(10)]],
    });
    if (!this.rowData.vendorId) {
      this.vendorForm.addControl(
        "userName",
        new FormControl("", [Validators.required])
      );
      this.vendorForm.addControl(
        "password",
        new FormControl("", [Validators.required])
      );
    }
  }

  get form() {
    return this.vendorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.vendorForm.invalid) {
      this.validateAllFormFields(this.vendorForm);
      return;
    }
    if (this.rowData.vendorId) {
      this.updateVendor(this.vendorForm.value);
    } else {
      this.submitVendor(this.vendorForm.value);
    }
  }

  onReset() {
    this.submitted = false;
    this.vendorForm.reset();
  }
  submitVendor(formValue) {
    const vendor = {
      code: formValue.code,
      name: formValue.name,
      description: formValue.description,
      mail: formValue.email,
      phone: formValue.phone,
      mobile: formValue.mobile,
    };
    this.vendorSvc.addVendor(vendor).subscribe((v) => {
      if (v) {
        this.vendorSvc
          .addUser({
            name: v["name"],
            vendorId: v["vendorId"],
            accessLevel: 2,
            companyName: v["name"],
            userName: formValue.userName,
            password: formValue.password,
            email: v["mail"],
            phone: v["phone"],
            userId: 0,
          })
          .subscribe((profile) => {
            this._notificationSvc.success(
              "Success",
              "Vendor added successfully"
            );
            this.vendorForm.reset();
            this.router.navigate(["/Vendor"]);
          });
      }
    });
  }

  updateVendor(formValue) {
      const vendor = {
        vendorId: this.rowData.vendorId,
        code: formValue.code,
        name: formValue.name,
        description: formValue.description,
        mail: formValue.email,
        phone: formValue.phone,
        mobile: formValue.mobile,
      };
      this.vendorSvc
        .updateVendor(this.rowData.vendorId, vendor)
        .subscribe((res) => {
          this._notificationSvc.success("Success", "Vendor updated successfully");
          this.vendorForm.reset();
          this.router.navigate(["/Vendor"]);
        });
    }
  validateAllFormFields(formGroup: FormGroup) {
      //{1}
      Object.keys(formGroup.controls).forEach((field) => {
        //{2}
        const control = formGroup.get(field); //{3}
        if (control instanceof FormControl) {
          //{4}
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          //{5}
          this.validateAllFormFields(control); //{6}
        }
      });
    }
}
