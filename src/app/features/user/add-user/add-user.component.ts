import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { UserService } from "../user.service";
import { NotificationService } from "../../../core/service/notification.server";
import { Router } from "@angular/router";
import { StorageService } from "../../../core/service/storage.service";

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
    email: "user2@mail.com",
    phone: "456465656",
    lastVisit: "",
    userName: "user2",
    style: "",
    password: "admin123",
  };
  vendorId: any;

  constructor(
    private formBuilder: FormBuilder,
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
    this.vendorId = parseInt(this.storage.getItem("vendorId"));
  }

  createForm(rowData) {
    this.userForm = this.formBuilder.group({
      email: [rowData.email, [Validators.required, Validators.email]],
      phone: [rowData.phone, [Validators.required, Validators.maxLength(10)]],
      userName: [rowData.userName, Validators.required],
      password: [rowData.password, Validators.required],
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
    const user = {
      userName: formValue.userName,
      password: formValue.password,
      email: formValue.email,
      phone: formValue.phone,
      accessLevel: 3,
    };
    const group = {
      groupId: 0,
      name: `${user.userName} Group`,
      description: `Group for ${user.userName}`,
      accessLevel: 3,
    };
    this.userSvc
      .addProfile({
        name: group["name"],
        description: group["description"],
        vendorId: this.vendorId,
        profileId: 0,
      })
      .subscribe((profile) => {
        if (profile) {
          this.userSvc
            .addUser({
              name: formValue.userName,
              vendorId: this.vendorId,
              accessLevel: 3,
              profileId: profile["profileId"],
              userName: formValue.userName,
              password: formValue.password,
              email: user["mail"],
              phone: user["phone"],
              userId: 0,
            })
            .subscribe((user) => {
              this._notificationSvc.success(
                "Success",
                "User updated successfully"
              );
              this.addGroup(user);
            });
        }
      });
  }

  updateUser(formValue) {
    const user = {
      ...this.rowData,
      userId: this.rowData.userId,
      userName: formValue.userName,
      password: formValue.password,
      email: formValue.email,
      phone: formValue.phone,
    };
    this.userSvc.updateUser(user).subscribe((res) => {
      this._notificationSvc.success("Success", "User updated successfully");
      this.userForm.reset();
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

  addGroup(user) {
    this.userSvc.addGroup(user.userName).subscribe((group) => {
      if (group) {
        this._notificationSvc.success("Success", "Group created successfully");
        this.addUserGroup(user, group);
      }
    });
  }

  addUserGroup(user, group) {
    this.userSvc
      .addUserGroup(user.userId, group["groupId"])
      .subscribe((usergroup) => {
        if (usergroup) {
          this._notificationSvc.success(
            "Success",
            "UserGroup created successfully"
          );
          this.userForm.reset();
          this.router.navigate(["/User"]);
        }
      });
  }
}
