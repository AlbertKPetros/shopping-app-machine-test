import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUniqueId } from '@app/shared/utils/guid';
import { DropDownService } from '@app/shared/services/drop-down.service';
import { DropDown } from '@app/shared/models/drop-down.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomValidationService } from '@app/shared/services/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  userType: DropDown[];
  businessSize: DropDown[];
  isSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dropDownService: DropDownService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private customValidator: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.userType = this.dropDownService.getUserType();
    this.businessSize = this.dropDownService.getBusinessSize();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        id: [getUniqueId()],
        userType: ['', Validators.required],
        businessSize: [''],
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: [
          '',
          [Validators.required, this.customValidator.passwordPattern()],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.customValidator.passwordMatch(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  typeOfUser() {
    return this.form.value.userType;
  }

  onUserTypeChange() {
    let selectedType = this.form.get('userType').value;
    let businessSizeControl = this.form.get('businessSize');
    if (selectedType == 'seller') {
      businessSizeControl.setValidators([Validators.required]);
    } else {
      businessSizeControl.setValue('');
      businessSizeControl.clearValidators();
    }
    businessSizeControl.updateValueAndValidity();
  }

  get registerFormControl() {
    return this.form.controls;
  }

  completeRegistration() {
    this.isSubmitted = true;
    if (this.form.valid) {
      if (confirm('Do you want to save?')) {
        this.authService
          .submitRegistration(this.form.value)
          .subscribe((response: any) => {
            this.toastr.success('', 'Registered successfully');
            this.router.navigate(['login']);
          });
      }
    }
  }
}
