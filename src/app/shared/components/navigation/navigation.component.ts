import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/models/user.model';
import { CredentialService } from '@app/services/credential.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  activeUser: User;
  constructor(
    private credentialService: CredentialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeUser = this.credentialService.getCredentials();
  }

  logout() {
    this.credentialService.removeCredentials();
    this.router.navigate(['login']);
  }
}
