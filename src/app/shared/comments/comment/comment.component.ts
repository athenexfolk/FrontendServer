import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { ReplyComponent } from '../reply/reply.component';
import { ReplyInputComponent } from '../reply-input/reply-input.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { CommentService } from '../../../core/services/comment.service';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from '../../../core/models/comment';
import { CommentOptionsComponent } from '../comment-options/comment-options.component';
import { AuthorityService } from '../../../core/auth/authority.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    ReplyComponent,
    ReplyInputComponent,
    RelativeTimePipe,
    CommentOptionsComponent,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() isLoggedIn = false;
  @Input({ required: true }) commentAndReplies!: CommentAndReplies;

  @Output() onDeleteCommentSuccess = new EventEmitter<Comment>();

  isReplyOpen = false;

  myId = '';

  constructor(
    private commentService: CommentService,
    private authority: AuthorityService
  ) {}

  ngOnInit(): void {
    this.myId = this.authority.user_id!;
  }

  openReply() {
    this.isReplyOpen = true;
  }

  closeReply() {
    this.isReplyOpen = false;
  }

  deleteComment() {
    this.commentService
      .deleteCommentInPost(
        this.commentAndReplies.comment.comment.postId,
        this.commentAndReplies.comment.comment._id
      )
      .subscribe((comment) => this.onDeleteCommentSuccess.emit(comment));
  }

  addReplyToComment(reply: CommentAndOwner) {
    this.commentAndReplies.replies.push(reply);
  }

  deleteReplyFromComment(deletedReply: Comment) {
    this.commentAndReplies.replies = this.commentAndReplies.replies.filter(
      (reply) => reply.comment._id !== deletedReply._id
    );
  }
}
