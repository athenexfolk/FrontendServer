import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-options',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.scss',
})
export class PostOptionsComponent {
  @Input({ required: true }) ofPostId: string = '';
  @Input({ required: true }) ofAuthorId: string = '';

  isPanelOpen = false;

  openPanel() {
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }
}
