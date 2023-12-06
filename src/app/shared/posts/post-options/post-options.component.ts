import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OverlayComponent } from '../../ui/overlay/overlay.component';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-post-options',
  standalone: true,
  imports: [CommonModule, RouterLink, OverlayComponent],
  templateUrl: './post-options.component.html',
  styleUrl: './post-options.component.scss',
})
export class PostOptionsComponent {
  @Input({ required: true }) ofPostId: string = '';
  @Input({ required: true }) ofAuthorId: string = '';

  @Output() deleteEmitter = new EventEmitter<string>();

  isPanelOpen = false;
  isDeletePanelOpen = false;

  constructor(private postService: PostService) {}

  openPanel() {
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  openDeletePanel() {
    this.isDeletePanelOpen = true;
  }

  closeDeletePanel() {
    this.isDeletePanelOpen = false;
  }

  deletePost() {
    this.postService.deletePost(this.ofPostId).subscribe(() => {
      this.deleteEmitter.emit(this.ofPostId);
      this.closeDeletePanel();
    });
  }
}
