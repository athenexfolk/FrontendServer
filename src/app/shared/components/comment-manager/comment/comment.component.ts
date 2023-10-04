import { Component, Input } from '@angular/core';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from 'src/app/core/models/comment';

@Component({
  selector: 'Comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() commentAndReplies!: CommentAndReplies;

  isReplying = false;

  openReply() {
    this.isReplying = true;
  }

  closeReply() {
    this.isReplying = false;
  }

  addReply(cao: CommentAndOwner) {
    this.commentAndReplies.replies.push(cao);
    this.closeReply();
  }
}
