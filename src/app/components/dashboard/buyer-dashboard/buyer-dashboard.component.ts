import { Component, OnInit } from '@angular/core';
import { CredentialService } from '@app/services/credential.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css'],
})
export class BuyerDashboardComponent implements OnInit {
  activeUser: User;
  constructor(private credentialService: CredentialService) {}

  ngOnInit(): void {
    this.activeUser = this.credentialService.getCredentials();
  }
}
