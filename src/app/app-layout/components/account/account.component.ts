import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorityService } from 'src/app/core/auth/authority.service';

@Component({
  selector: 'Account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  myId = '';
  isPanelOpened = false;

  constructor(private auth: AuthorityService, private router: Router) {
    this.myId = this.auth.user_id || '';
  }

  openPanel() {
    this.isPanelOpened = true;
  }
  closePanel() {
    this.isPanelOpened = false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth', 'login']);
  }

  getProfileImage() {
    return '/api/img/v1/avatar/' + this.auth.user_id;
  }
}
