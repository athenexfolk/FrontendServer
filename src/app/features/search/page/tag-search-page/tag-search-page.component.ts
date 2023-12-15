import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tags } from '../../../../core/constants/tags';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from '../../../../core/models/tag';
import { TagService } from '../../../../core/services/tag.service';
import { TagRemoverComponent } from '../../../../shared/tags/tag-remover/tag-remover.component';

@Component({
  selector: 'app-tag-search-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    TagRemoverComponent,
  ],
  templateUrl: './tag-search-page.component.html',
  styleUrl: './tag-search-page.component.scss',
})
export class TagSearchPageComponent implements OnInit, OnDestroy {
  searchText = '';
  availableTags = [...Tags];
  filteredSearchTags: Tag[] = [...Tags];
  isTagsPanelOpen = false;

  isSearchTextExist = true;

  allTags: Tag[] = [];
  maxSearchLength = 12;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe(
      (qm) => (this.allTags = this.tagService.mapAllTags(qm.getAll('tag')))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openTagsPanel() {
    this.isTagsPanelOpen = true;
  }

  closeTagsPanel() {
    this.isTagsPanelOpen = false;
  }

  addTagFilter(addingTag: Tag) {
    if (this.allTags.find((tag) => tag.name === addingTag.name)) return;
    this.allTags.push(addingTag);
  }

  removeTagFilter(removingTag: Tag) {
    this.allTags = this.allTags.filter((tag) => tag.name !== removingTag.name);
  }

  filterTags(e: Event) {
    const el = e.target as HTMLInputElement;
    if (el.value.length > this.maxSearchLength) {
      el.value = el.value.slice(0, this.maxSearchLength);
      this.searchText = el.value;
    }
    this.isSearchTextExist = false;
    this.filteredSearchTags = this.availableTags.filter((tag) =>
      tag.name.toLowerCase().startsWith(this.searchText.toLowerCase().trim())
    );

    if (
      !!this.filteredSearchTags.find(
        (tag) => tag.name.toLowerCase() === this.searchText.toLowerCase()
      )
    ) {
      this.isSearchTextExist = true;
    }
  }

  searchPosts() {
    const tags = this.allTags.map((tag) => tag.name);
    this.router.navigate(['/search', 'tags'], {
      queryParams: { tag: tags },
    });
  }

  mapUnknowTag() {
    return this.tagService.mapUnknownTag(this.searchText)
  }
}
