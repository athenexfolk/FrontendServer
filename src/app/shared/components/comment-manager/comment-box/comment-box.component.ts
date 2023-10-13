import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { CommentAndOwner } from 'src/app/core/models/comment';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'CommentBox',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent {
  @Input() postId = '';
  @Output() addCommentEvent = new EventEmitter<CommentAndOwner>();

  commentData = '';

  constructor(private commentService: CommentService) {}

  sendComment() {
    this.commentService
      .addCommentToPost(this.postId, {
        data: this.commentData,
      })
      .pipe(
        switchMap((res) =>
          this.commentService.mapCommentAndOwner(res, res.commentOwnerId)
        )
      )
      .subscribe((res) => {
        this.addCommentEvent.emit(res);
        this.commentData = ''
      });
  }
}
