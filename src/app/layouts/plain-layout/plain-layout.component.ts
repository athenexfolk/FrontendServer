import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plain-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './plain-layout.component.html',
  styleUrl: './plain-layout.component.scss'
})
export class PlainLayoutComponent {

  constructor(private location: Location) {}

  goBack() {
    this.location.back()
  }
}
