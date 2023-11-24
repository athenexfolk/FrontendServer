import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  onProfileError(e: Event) {
    const el = e.target as HTMLImageElement;
    el.src = 'assets/images/default-avatar.svg';
    el.onerror = null;
  }
}
