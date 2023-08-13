import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Headings',
  templateUrl: './headings.component.html',
  styleUrls: ['./headings.component.scss'],
})
export class HeadingsComponent {
  @Input() postTitle = ''
  @Output() postTitleChange = new EventEmitter<string>();
  
  @Input() postDescription = '';
  @Output() postDescriptionChange = new EventEmitter<string>();

  onTitleInput(e: Event) {
    let el = e.target as HTMLElement
    this.postTitleChange.emit(el.textContent!)
  }

  onSubtitleInput(e: Event) {
    let el = e.target as HTMLElement
    this.postDescriptionChange.emit(el.textContent!)
  }
}
