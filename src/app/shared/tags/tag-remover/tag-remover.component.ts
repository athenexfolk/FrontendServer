import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';
import { Tag } from '../../../core/models/tag';

@Component({
  selector: 'app-tag-remover',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './tag-remover.component.html',
  styleUrl: './tag-remover.component.scss',
})
export class TagRemoverComponent {
  @Input({ required: true }) tag!: Tag;
  @Output() remove = new EventEmitter<Tag>();

  removeTag() {
    this.remove.emit(this.tag);
  }
}
