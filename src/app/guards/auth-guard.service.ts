import { Injectable } from '@angular/core';
import {
  CanActivate,
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
    if (creds === null) {
      this.router.navigate(['login']);
      return false;
    } else {
      if (creds.userType == 'buyer' && url === '/dashboard-seller') {
        this.router.navigate(['dashboard-buyer']);
        return false;
      } else if (creds.userType == 'seller' && url === '/dashboard-buyer') {
        this.router.navigate(['dashboard-seller']);
        return false;
      } else if (url === '/') {
        let redirectUrl =
          creds.userType == 'seller' ? '/dashboard-seller' : '/dashboard-buyer';
        this.router.navigate([redirectUrl]);
        return false;
      }
      return true;
    }
  }
}
