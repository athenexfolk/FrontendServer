import { Component, Input } from '@angular/core';
import { Comment, CommentAndOwner } from 'src/app/core/models/comment';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'Reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  @Input() reply!: CommentAndOwner;
}
