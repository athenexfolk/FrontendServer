import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorityService } from 'src/app/core/auth/authority.service';
import {
  Comment,
  CommentAndOwner,
  CommentAndReplies,
} from 'src/app/core/models/comment';

@Component({
  selector: 'CommentWrapper',
  templateUrl: './comment-wrapper.component.html',
  styleUrls: ['./comment-wrapper.component.scss'],
})
export class CommentWrapperComponent {
  @Input() comments: CommentAndReplies[] = [];
  @Input() postId: string = '';

  loginStatus = false;

  constructor(private authService: AuthorityService) {}

  ngOnInit() {
    this.loginStatus = this.authService.isLoggedin;
  }

  addComment(comment: CommentAndOwner) {
    this.comments.push({ comment: comment, replies: [] });
  }
}
