import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

    vendorForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.vendorForm = this.formBuilder.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required,]],
            mobile: ['', Validators.required, Validators.maxLength(10)],
        });
    }

    // convenience getter for easy access to form fields
    get form() { return this.vendorForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.vendorForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.vendorForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.vendorForm.reset();
    }
}


