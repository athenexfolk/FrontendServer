import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-mini-post',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss']
})
export class MiniPostComponent {
  @Input() isMarked = true
  @Input({required:true}) data!:Post
}
