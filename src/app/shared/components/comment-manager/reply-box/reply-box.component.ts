import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { CommentAndOwner } from 'src/app/core/models/comment';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'ReplyBox',
  templateUrl: './reply-box.component.html',
  styleUrls: ['./reply-box.component.scss'],
})
export class ReplyBoxComponent {
  @Input() postId = '';
  @Input() commentId = '';
  @Output() addCommentEvent = new EventEmitter<CommentAndOwner>();

  commentData = '';

  constructor(private commentService: CommentService) {}

  sendComment() {
    this.commentService
      .addCommentToPost(this.postId, {
        data: this.commentData,
        replyToId: this.commentId,
      })
      .pipe(
        switchMap((res) =>
          this.commentService.mapCommentAndOwner(res, res.commentOwnerId)
        )
      )
      .subscribe((res) => {
        this.addCommentEvent.emit(res);
        this.commentData = '';
      });
  }
}
