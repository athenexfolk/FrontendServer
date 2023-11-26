import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { ReplyComponent } from '../reply/reply.component';
import { ReplyInputComponent } from '../reply-input/reply-input.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent, ReplyComponent, ReplyInputComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() isLoggedIn = false;

  isReplyOpen = false;

  openReply() {
    this.isReplyOpen = true;
  }
  closeReply() {
    this.isReplyOpen = false;
  }
}
