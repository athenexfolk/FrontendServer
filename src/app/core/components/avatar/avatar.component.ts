import { Component, Input } from '@angular/core';

@Component({
  selector: 'Avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() isLoggedIn = true;
  isProfileMenuOpen = false;
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
}
