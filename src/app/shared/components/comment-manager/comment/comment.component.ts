import { Component, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import { Comment } from 'src/app/core/models/comment';

@Component({
  selector: 'Comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() owner!: Author;
}
