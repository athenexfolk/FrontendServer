import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'Account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  isPanelOpened = false;

  constructor(private auth: AuthService){}
  
  openPanel() {
    this.isPanelOpened = true;
  }
  closePanel() {
    this.isPanelOpened = false;
  }

  logout() {
    this.auth.logout();
  }

  getProfileImage() {
    return '/api/img/v1/avatar/'+this.auth.getUid()
  }
}
