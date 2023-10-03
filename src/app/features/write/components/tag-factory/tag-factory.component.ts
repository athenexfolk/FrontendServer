import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tags } from 'src/app/core/constant/tags';
import { Tag } from 'src/app/core/models/tag';

@Component({
  selector: 'TagFactory',
  templateUrl: './tag-factory.component.html',
  styleUrls: ['./tag-factory.component.scss'],
})
export class TagFactoryComponent {
  validTags = Tags;
  maxTag = 5;

  searchText = '';

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
    if (
      this.tags.length >= this.maxTag ||
      this.tags.find((vtag) => vtag.name === tag.name)
    )
      return;
    this.tags.push(tag);
  }

  addCustomTag() {
    if (this.tags.find((vtag) => vtag.name === this.searchText)) return;
    this.tags.push({ name: this.searchText, color: '3f3f46' });
  }

  removeTag(id: number) {
    this.tags.splice(id, 1);
  }

  filterTag() {
    if (this.searchText.length >= 12) {
      this.searchText = this.searchText.slice(0, 12);
      return;
    }
    this.validTags = Tags.filter((tag) =>
      tag.name.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }
}
