import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user.model';
import { CredentialService } from '@app/services/credential.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
})
export class SellerDashboardComponent implements OnInit {
  activeUser: User;
  constructor(private credentialService: CredentialService) {}

  ngOnInit(): void {
    this.activeUser = this.credentialService.getCredentials();
  }
}
