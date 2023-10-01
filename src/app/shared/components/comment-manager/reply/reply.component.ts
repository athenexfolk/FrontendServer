import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  @Input() comment!: Comment;
  @Input() owner!: User;
}
