import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from '../top-navigation/top-navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, TopNavigationComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}