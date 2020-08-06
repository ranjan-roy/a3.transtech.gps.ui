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
    profileId: null,
    vendorId: null,
    createdBy: "",
    createdDate: "",
    email: "",
    phone: "",
    lastVisit: "",
    userName: "",
    style: "",
  };

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
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

  ngOnInit() {}
  createForm(rowData) {
    this.userForm = this.formBuilder.group({
      createdBy: [rowData.createdBy, Validators.required],
      createdDate: [rowData.createdDate, Validators.required],
      email: [rowData.mail, [Validators.required, Validators.email]],
      phone: [rowData.phone, [Validators.required, Validators.maxLength(10)]],
      lastVisit: [rowData.lastVisit, Validators.required],
      userName: [rowData.userName, Validators.required],
      style: [rowData.style, Validators.required],
    });
  }

  get form() {
    return this.userForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
}
