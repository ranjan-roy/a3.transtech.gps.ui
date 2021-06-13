import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserDetails } from '../../interface/common.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() user: IUserDetails;
  emailForm: FormGroup;
  emailFormSubmitted = true;

  phoneForm: FormGroup;
  phoneFormSubmitted = true;
  email = "";
  phone = "";
  currentUser: IUserDetails = null;

  constructor(private formBuilder: FormBuilder,) {
    this.createForm();
  }


  ngOnChanges(): void {
    if (this.user) {
      this.currentUser = this.user;
      this.email = this.user.email;
      this.phone = this.user.contactPrimary;
      this.emailForm.setValue({
        email: this.email
      })
      this.phoneForm.setValue({
        phone: this.phone
      })
    }
  }

  ngOnInit(): void {

  }
  editEmail() {
    this.emailFormSubmitted = false;
  }
  editPhone() {
    this.phoneFormSubmitted = false;
  }

  createForm() {
    this.emailForm = this.formBuilder.group({
      email: [
        this.email,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
    });

    this.phoneForm = this.formBuilder.group({
      phone: [
        this.phone,
        [
          Validators.required,
          Validators.pattern("^[0-9]$"),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  onSubmitEmailForm() {

  }

  onSubmitPhoneForm() {

  }

}
