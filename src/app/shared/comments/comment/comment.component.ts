import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { ReplyComponent } from '../reply/reply.component';
import { ReplyInputComponent } from '../reply-input/reply-input.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    ReplyComponent,
    ReplyInputComponent,
    RelativeTimePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() isLoggedIn = false;

  isReplyOpen = false;

  date = new Date("11-11-2023");
  openReply() {
    this.isReplyOpen = true;
  }
  closeReply() {
    this.isReplyOpen = false;
  }
}
