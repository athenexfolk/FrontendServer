import { Component } from '@angular/core';
import { AuthorityService } from 'src/app/core/auth/authority.service';

@Component({
  selector: 'Account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  isPanelOpened = false;

  constructor(private auth: AuthorityService){}
  
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
    return '/api/img/v1/avatar/'+this.auth.user_id 
  }
}
