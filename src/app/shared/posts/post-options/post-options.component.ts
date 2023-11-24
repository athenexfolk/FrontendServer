import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.scss',
})
export class PostOptionsComponent {
  @Input({ required: true }) ofId: string = '';

  isPanelOpen = false;

  openPanel() {
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }
}
