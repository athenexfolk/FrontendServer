import { Component, Input } from '@angular/core';
import { CompletePost } from 'src/app/core/models/complete-post';
import { MiniPost } from 'src/app/core/models/mini-post';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'MiniPost',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss']
})
export class MiniPostComponent {
  @Input() post!: MiniPost
}
