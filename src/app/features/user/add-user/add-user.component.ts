import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";
import { select, Store } from "@ngrx/store";
import * as userActions from "../../../state/user/user.actions";
import { UserService } from "../../../services/user.service";
import { VendorService } from "../../../services/vendor.service";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  rowData: any = {
    userId: null,
    profileId: 0,
    vendorId: null,
    createdBy: "",
    createdDate: "",
    email: "",
    //phone: "",
    contactprimary: "",
    contactsecondary: "",
    lastVisit: "",
    userName: "",
    style: "",
    password: "",
  };
  vendorId: any;
  vendorList: any;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private vendorSvc: VendorService,
    protected _notificationSvc: NotificationService,
    private router: Router,
    private storage: StorageService,
    private store: Store
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.rowData = navigation.extras.state;
    }

    this.createForm(this.rowData);
  }

  ngOnInit() {
    this.vendorSvc.getAllVendor().subscribe((res) => {
      this.vendorList = res;
    });
  }

  changeVendor(e) {
    this.userForm.get("vendorId").setValue(parseInt(e.target.value), {
      onlySelf: true,
    });
  }

  createForm(rowData) {
    this.userForm = this.formBuilder.group({
      email: [
        rowData.email,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      //phone: [rowData.phone, [Validators.required, Validators.maxLength(10)]],
      contactPrimary: [rowData.contactPrimary, Validators.required],
      contactSecondary: [rowData.contactSecondary],
      userName: [rowData.userName, Validators.required],
      password: this.rowData?.userId
      ? [
          { value: rowData.password, disabled: true },
          Validators.required,
        ]
      : [rowData.password, Validators.required],
      vendorId: this.rowData?.userId
        ? [
            { value: rowData.vendorId?.toString(), disabled: true },
            Validators.required,
          ]
        : [rowData.vendorId?.toString(), Validators.required],
      company: [rowData.companyName, Validators.required],
    });
  }

  get form() {
    return this.userForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      this.validateAllFormFields(this.userForm);
      return;
    }
    if (this.rowData.userId) {
      this.updateUser(this.userForm.value);
    } else {
      this.addUser(this.userForm.value);
    }
  }

  addUser(formValue) {
    this.userSvc
      .addUser({
        name: formValue.userName,
        vendorId: formValue.vendorId,
        companyName: formValue.company,
        accessLevel: 3,
        userName: formValue.userName,
        password: formValue.password,
        email: formValue.email,
        //phone: formValue.phone,
        contactPrimary: formValue.contactPrimary.toString(),
        contactSecondary: formValue.contactSecondary.toString(),
        userId: 0,
      })
      .subscribe((user) => {
        this._notificationSvc.success("Success", "User added successfully");
        this.store.dispatch(new userActions.GetUserInitAction({}));
        this.router.navigate(["/User"]);
      });
  }

  updateUser(formValue) {
    const user = {
      ...this.rowData,
      userId: this.rowData.userId,
      userName: formValue.userName,
      password: formValue.password,
      email: formValue.email,
      companyName: formValue.company,
      contactPrimary: formValue.contactPrimary.toString(),
      contactSecondary: formValue.contactSecondary.toString(),
    };
    this.userSvc.updateUser(user).subscribe((res) => {
      this._notificationSvc.success("Success", "User updated successfully");
      this.userForm.reset();
      this.store.dispatch(new userActions.GetUserInitAction({}));
      this.router.navigate(["/User"]);
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
