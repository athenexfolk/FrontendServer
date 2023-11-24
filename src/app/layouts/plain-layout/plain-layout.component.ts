import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-plain-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './plain-layout.component.html',
  styleUrl: './plain-layout.component.scss'
})
export class PlainLayoutComponent {

}
