import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-post',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss']
})
export class MiniPostComponent {
  @Input() isMarked = true
}
