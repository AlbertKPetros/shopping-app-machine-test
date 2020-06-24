import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Register } from '@app/models/register.model';
import { Login } from '@app/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  submitRegistration(register: Register) {
    const { confirmPassword, ...rest } = register;
    const regObj = rest;
    return this.http.post<any>(environment.apiBaseUrl + 'users', regObj);
  }

  getUserCredentialsByEmail(login: Login) {
    return this.http.get<any>(
      environment.apiBaseUrl + `users?email=${login.email}`
    );
  }
}
