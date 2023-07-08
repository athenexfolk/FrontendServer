import { Component, Input } from '@angular/core';

@Component({
  selector: 'BookmarkButton',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss']
})
export class BookmarkButtonComponent {
  @Input() state = false

  toggleMark() {
    this.state = !this.state
  }
}
