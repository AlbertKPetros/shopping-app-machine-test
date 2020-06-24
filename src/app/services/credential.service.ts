import { Injectable } from '@angular/core';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CredentialService {
  constructor() {}

  setCredentials(user: User) {
    const { password, ...rest } = user;
    const usrObj = rest;
    sessionStorage.setItem('credentials', JSON.stringify(usrObj));
  }

  getCredentials(): User {
    return JSON.parse(sessionStorage.getItem('credentials'));
  }

  removeCredentials() {
    sessionStorage.removeItem('credentials');
  }
}
