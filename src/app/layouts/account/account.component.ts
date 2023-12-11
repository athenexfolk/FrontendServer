import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AvatarComponent } from '../../shared/users/avatar/avatar.component';
import { AuthorityService } from '../../core/auth/authority.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { UserInformationService } from '../../core/services/user-information.service';
import { Profile } from '../../core/models/profile';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  me!: Profile;
  isPanelOpened = false;

  constructor(
    private authority: AuthorityService,
    private router: Router,
    private userInformationService: UserInformationService
  ) {}

  ngOnInit(): void {
    if (this.authority.user_id)
      this.userInformationService
        .getUserProfile(this.authority.user_id)
        .subscribe((user) => (this.me = user));
  }

  openPanel() {
    this.isPanelOpened = true;
  }

  closePanel() {
    this.isPanelOpened = false;
  }

  logout() {
    this.authority.logout();
    this.router.navigate(['/auth/signin']);
    this.closePanel();
  }
}
