import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../core/service/notification.server";
import { IUserDetails } from "../../interface/common.interface";
import { UserService } from "../../services/user.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ImageCroppedEvent } from "ngx-image-cropper";
import { environment } from "../../../environments/environment";
import { UtilService } from "../../services/util.service";
const maxFileSize = 5 * 1024 * 1024;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() user: IUserDetails;
  @Output() onProfileAvatarChange = new EventEmitter();

  url = environment.apiUrl;
  emailForm: FormGroup;
  emailFormSubmitted = true;
  phoneForm: FormGroup;
  phoneFormSubmitted = true;
  email = null;
  phone = null;
  currentUser: IUserDetails = null;
  fileToReturn: any;
  data: any;
  fileName: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  imageEdit = false;
  fileError: string;
  userType: string;

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    protected _notificationSvc: NotificationService,
    private modalService: BsModalService,
    private utilSvc: UtilService
  ) {
    this.createForm();
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    const size = this.utilSvc.formatBytes(file.size);
    if (file.size > maxFileSize) {
      this.fileError =
        "Warning !  The uploaded file  is of  size " +
        size +
        ", this exceeds the maximum allowed size of 5 MB";
    }
    if (!this.utilSvc.isValidImageExtension(file.name)) {
      this.fileError = "Allowed image type .png";
    }

    if (!this.fileError) {
      this.imageChangedEvent = event;
    }
    console.log("size", file.size);
    console.log("type", file.type);
    console.log(this.fileError);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImage = event.base64;
    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    );
    return this.fileToReturn;
  }
  base64ToFile(data, filename) {
    this.fileName = filename;
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  verifyPhone() {
    console.log("verify phone called.");
  }

  verifyEmail() {
    console.log("verify email called.");
  }

  editPic() {
    this.imageEdit = true;
  }
  editPicCancel() {
    this.imageChangedEvent = null;
    this.croppedImage = this.user.profilePicture;
    this.imageEdit = false;
  }

  handleUpload() {
    let formData: FormData = new FormData();
    formData.append("file", this.fileToReturn, this.fileName);
    this.userSvc.updateProfilePicture(formData).subscribe(
      (res) => {
        console.log(res);
        this._notificationSvc.success(
          "Success",
          "Profile Picture updated successfully"
        );
        this.imageEdit = false;
        this.onProfileAvatarChange.emit(res);
      },
      (error) => {
        this._notificationSvc.success("Error", "Some error occured" + error);
      }
    );
  }

  ngOnChanges(): void {
    if (this.user) {
      this.currentUser = this.user;
      this.email = this.user.email;
      this.phone = this.user.contactPrimary;
      this.emailForm.setValue({
        email: this.email,
      });
      this.phoneForm.setValue({
        phone: this.phone,
      });
      this.croppedImage = this.user.profilePicture;

      if (this.currentUser.accessLevel == 1) {
        this.userType = "Admin"
      } else if (this.currentUser.accessLevel == 2) {
        this.userType = "Vendor Admin"
      } else if (this.currentUser.accessLevel == 3) {
        this.userType = "General User"
      }
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
  editPhoneCancel() {
    this.phone = this.user.contactPrimary;
    this.phoneForm.setValue({
      phone: this.phone,
    });
    this.phoneFormSubmitted = true;
  }

  editEmailCancel() {
    this.email = this.user.email;
    this.emailForm.setValue({
      email: this.email,
    });
    this.emailFormSubmitted = true;
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
          Validators.pattern("[7-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  onSubmitEmailForm() {
    const form = this.emailForm.value;
    if (form.email && this.emailForm.valid && !this.emailFormSubmitted) {
      this.userSvc
        .updateUserFields(this.user.userId, { email: form.email })
        .subscribe((res) => {
          this._notificationSvc.success(
            "Success",
            "Email updated successfully"
          );
          this.user.emailVerified = false;
          this.emailFormSubmitted = true;
        });
    }
  }

  onSubmitPhoneForm() {
    const form = this.phoneForm.value;
    if (form.phone && this.phoneForm.valid && !this.phoneFormSubmitted) {
      this.userSvc
        .updateUserFields(this.user.userId, { contactPrimary: form.phone })
        .subscribe((res) => {
          this._notificationSvc.success(
            "Success",
            "Phone updated successfully"
          );
          this.user.phoneVerified = false;
          this.phoneFormSubmitted = true;
        });
    }
  }
}
