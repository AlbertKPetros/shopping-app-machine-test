import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Register } from '@app/models/register.model';
import { Login } from '@app/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  submitRegistration(register: Register) {
    const { confirmPassword, ...rest } = register;
    const regObj = rest;
    regObj.email = regObj.email.toLowerCase();
    return this.http.post<any>(this.baseUrl + 'users', regObj);
  }

  getUserCredentialsByEmail(login: Login) {
    return this.http.get<any>(
      this.baseUrl + `users?email=${login.email.toLowerCase()}`
    );
  }

  emailExists(email: string) {
    return this.http.get<any>(
      this.baseUrl + `users?email=${email.toLowerCase()}`
    );
  }
}
