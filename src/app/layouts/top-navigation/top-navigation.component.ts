import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from '../brand/brand.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BottomNavigationComponent } from '../bottom-navigation/bottom-navigation.component';
import { AccountComponent } from '../account/account.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    CommonModule,
    BrandComponent,
    NavigationComponent,
    BottomNavigationComponent,
    AccountComponent,
    RouterLink
  ],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss',
})
export class TopNavigationComponent {
  isLargeScreen = false;
  isLoggedIn = false;

  constructor(private bpo: BreakpointObserver) {}

  ngOnInit(): void {
    this.bpo.observe('(min-width: 768px)').subscribe((state) => {
      this.isLargeScreen = state.matches;
    });
  }
}
