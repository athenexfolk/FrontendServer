import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../core/models/tag';
import { TagComponent } from '../tag/tag.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagService } from '../../../core/services/tag.service';
import { TagRemoverComponent } from '../tag-remover/tag-remover.component';
import { PostDataService } from '../../../core/services/post-data.service';

@Component({
  selector: 'app-tag-factory',
  standalone: true,
  imports: [
    CommonModule,
    TagComponent,
    TagRemoverComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tag-factory.component.html',
  styleUrl: './tag-factory.component.scss',
})
export class TagFactoryComponent implements OnInit {
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();

  @Input() isEditable = false;

  maxSelectedTags = 6;
  selectedTags: Tag[] = [];

  availableTags: Tag[];
  filteredSearchTags: Tag[];

  isTagPanelOpen = false;

  searchText = '';
  maxSearchTextLength = 18;

  constructor(
    private tagService: TagService,
    private postDataService: PostDataService
  ) {
    this.availableTags = [...this.tagService.vtags];
    this.filteredSearchTags = [...this.tagService.vtags];
  }

  ngOnInit(): void {
    this.selectedTags = this.tagService.mapAllTags(this.tags);
    this.postDataService.tags = this.tags;
  }

  openTagPanel() {
    this.isTagPanelOpen = true;
  }

  closeTagPanel() {
    this.isTagPanelOpen = false;
  }

  addTag(tag: Tag) {
    if (this.isFullySelected()) return;
    if (this.isTagAlreadySelected(tag)) return;
    this.selectedTags.push(tag);

    const newTags = [...this.tags, tag.name];
    this.tagsChange.emit(newTags);
    this.postDataService.tags = newTags;
  }

  removeTag(removedTag: Tag) {
    this.selectedTags = this.selectedTags.filter(
      (tag) => tag.name !== removedTag.name
    );

    const newTags = [
      ...this.tags.filter((tagName) => tagName !== removedTag.name),
    ];
    this.tagsChange.emit(newTags);
    this.postDataService.tags = newTags;
  }

  isTagAlreadySelected(tag: Tag) {
    return !!this.selectedTags.find(
      (selectedTag) => selectedTag.name === tag.name
    );
  }

  isFullySelected() {
    return this.selectedTags.length >= this.maxSelectedTags;
  }

  filterTags() {
    this.filteredSearchTags = this.availableTags.filter((tag) =>
      tag.name.toLowerCase().startsWith(this.searchText.toLowerCase().trim())
    );
    if (!this.filteredSearchTags.length) {
      this.filteredSearchTags.push(
        this.tagService.mapUnknownTag(this.searchText.trim())
      );
    }
  }
}
