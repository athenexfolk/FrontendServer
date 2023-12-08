import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [
    CommonModule,
    //NavigationComponent,
    RouterLink,
  ],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  @ViewChild('floatButton') floatButton!: ElementRef<HTMLButtonElement>;
  lastScrollPosition = 0;

  @HostListener('window:scroll', ['$event'])
  scrollEvent() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.lastScrollPosition) {
      this.floatButton.nativeElement.style.bottom = '-72px';
    } else if (currentScrollPosition < this.lastScrollPosition) {
      this.floatButton.nativeElement.style.bottom = '16px';
    }
    this.lastScrollPosition = currentScrollPosition;
  }
}
