import { Component } from '@angular/core';

@Component({
  selector: 'CommentBox',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent {
  commentData = ''

  sendComment() {
    console.log('send', this.commentData);

  }
}
