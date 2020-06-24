import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CredentialService } from '@app/services/credential.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public router: Router,
    private credentialService: CredentialService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = state.url;
    var creds = this.credentialService.getCredentials() || null;
    if (creds === null || url === '/') {
      this.router.navigate(['login']);
      return false;
    } else {
      if (creds.userType == 'buyer' && url === '/dashboard-seller') {
        return false;
      } else if (creds.userType == 'seller' && url === '/dashboard-buyer') {
        return false;
      }
      return true;
    }
    return false;
  }
}
