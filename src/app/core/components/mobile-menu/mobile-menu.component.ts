import { Component } from '@angular/core';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuButtonComponent {
  isMobileMenuOpen = false;
  openMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
