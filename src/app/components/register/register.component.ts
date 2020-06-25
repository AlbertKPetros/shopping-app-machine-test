import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { getUniqueId } from '@app/shared/utils/guid';
import { DropDownService } from '@app/shared/services/drop-down.service';
import { DropDown } from '@app/shared/models/drop-down.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomValidationService } from '@app/shared/services/custom-validation.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

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
        email: [
          '',
          [Validators.required, Validators.email],
          [emailIdExist(this.authService)],
        ],
        password: [
          '',
          [Validators.required, this.customValidator.passwordPattern()],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: Validators.compose([
          this.customValidator.passwordMatch('password', 'confirmPassword'),
        ]),
      }
    );
  }

  get typeOfUser() {
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

const emailIdExist = (authService: AuthenticationService) => (
  c: FormControl
) => {
  if (!c || String(c.value).length === 0) {
    return of(null);
  }

  return authService.emailExists(String(c.value)).pipe(
    map((user: any[]) => {
      return user.length == 0 ? null : { emailExists: true };
    })
  );
};
