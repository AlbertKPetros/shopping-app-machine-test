import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getUniqueId } from '@app/shared/utils/guid';
import { DropDownService } from '@app/shared/services/drop-down.service';
import { DropDown } from '@app/shared/models/drop-down.model';
import { AuthenticationService } from '@app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userType = this.dropDownService.getUserType();
    this.businessSize = this.dropDownService.getBusinessSize();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [getUniqueId()],
      userType: [''],
      businessSize: [''],
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  typeOfUser() {
    return this.form.value.userType;
  }

  onUserTypeChange() {
    this.form.patchValue({ businessSize: '' });
  }

  completeRegistration() {
    if (this.form.valid) {
      if (confirm('Do you want to save?')) {
        this.isSubmitted = true;
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
