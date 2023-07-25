import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from 'src/app/core/models/tag';

@Component({
  selector: 'TagFactory',
  templateUrl: './tag-factory.component.html',
  styleUrls: ['./tag-factory.component.scss'],
})
export class TagFactoryComponent {
  validTags: Tag[] = [
    { name: 'HTML', color: 'e34c26' },
    { name: 'CSS', color: '264de4' },
    { name: 'JS', color: 'F0DB4F' },
    { name: 'NodeJS', color: '68A063' },
  ];

  maxTag = 5;

  @Input() tags: Tag[] = [];
  @Output() tagsChange = new EventEmitter<Tag[]>();

  isSearching = false;

  openPanel() {
    this.isSearching = true;
  }

  closePanel() {
    this.isSearching = false;
  }

  addTag(tag: Tag) {
    if (this.tags.length >= this.maxTag) return;
    this.tags.push(tag);
  }

  removeTag(id: number) {
    this.tags.splice(id, 1);
  }
}
