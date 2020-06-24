import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CredentialService } from '@app/services/credential.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private credentialService: CredentialService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginFormControl() {
    return this.form.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.form.valid) {
      let login = this.form.value;
      this.authService
        .getUserCredentialsByEmail(login)
        .subscribe((user: any) => {
          if (login.password === user[0]?.password) {
            this.credentialService.setCredentials(user[0]);
            this.navigateToDashBoard(user[0]?.userType);
          } else {
            this.toastr.error('', 'Invalid email or password');
          }
        });
    }
  }

  navigateToDashBoard(userType: string) {
    if (userType == 'seller') this.router.navigate(['dashboard-seller']);
    else this.router.navigate(['dashboard-buyer']);
  }
}
