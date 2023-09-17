import { Component, Input } from '@angular/core';
import { CommentAndOwner } from 'src/app/core/models/comment';

@Component({
  selector: 'CommentGroup',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss']
})
export class CommentGroupComponent {
  @Input() caos: CommentAndOwner[] = [];
}
