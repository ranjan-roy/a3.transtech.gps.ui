import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../service/login.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { StorageService } from "../../service/storage.service";
import { mockUserAccess, mockVendorAccess } from "../../../../mock";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styles: [
    `
      .app-body {
        background-color: #161c4e;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  invalidLogin = false;
  loading = false;
  invalidScreen = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: StorageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    this.invalidLogin = false;
    this.loading = true;
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          if (res.token && res.token.token) {
            this.loading = false;
            const user = res.token;
            this.store.setToken(user.token);
            this.store.setItem("accessLevel", user.accessLevel);
            this.store.setItem("userId", user.userId);
            this.store.setItem("userName", user.userName);
            this.store.setItem("vendorId", user.vendorId);
            this.store.setItem("profileId", user.profileId);
            this.screen(user.profileId);
          } else {
            this.invalidLogin = true;
            this.loading = false;
          }
        }
      },
      (err) => {
        this.invalidLogin = true;
        this.loading = false;
      }
    );
  }

  screen(id) {
    this.loading = true;
    this.invalidScreen = true;
    this.isSubmitted = true;
    this.loginService.screen(id).subscribe((res) => {
      if (res) {
        this.loading = false;
        this.store.setItem("entitlement", JSON.stringify(res));
        this.router.navigate(["Dashboard"]);
      } else {
        this.invalidScreen = false;
        this.loading = false;
      }
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
