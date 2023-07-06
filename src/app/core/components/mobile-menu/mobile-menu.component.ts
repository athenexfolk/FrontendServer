import { Component } from '@angular/core';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuButtonComponent {
  menuTitle = 'เมนู';
  isMobileMenuOpen = false;
  openMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
