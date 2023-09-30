import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'Comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() owner!: User;
}
