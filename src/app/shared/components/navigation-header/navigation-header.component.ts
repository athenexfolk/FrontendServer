import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent {
  isMobileMenuOpen = false
  isLoggedIn = true
  isProfileMenuOpen = false

  toggleMobileMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }
}
