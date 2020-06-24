import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Register } from '@app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  submitRegistration(register: Register) {
    return this.http.post<any>(environment.apiBaseUrl + 'users', register);
  }
}
