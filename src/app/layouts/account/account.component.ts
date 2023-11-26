import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../../shared/users/avatar/avatar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  isPanelOpened = false;

  openPanel() {
    this.isPanelOpened = true;
  }

  closePanel() {
    this.isPanelOpened = false;
  }

  logout() {}
}
