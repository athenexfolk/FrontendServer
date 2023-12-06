import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { CoverComponent } from '../cover/cover.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { PostPreviewAndAuthor } from '../../../core/models/post-and-author';
import { TagComponent } from '../../tags/tag/tag.component';
import { TagGroupComponent } from '../../tags/tag-group/tag-group.component';
import { Tag } from '../../../core/models/tag';
import { TagService } from '../../../core/services/tag.service';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProfileHeaderComponent,
    PostOptionsComponent,
    CoverComponent,
    RelativeTimePipe,
    TagComponent,
    TagGroupComponent,
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent implements OnInit {
  @Input() userId: string | null = null;
  @Input() ppa!: PostPreviewAndAuthor;

  tags: Tag[] = [];

  @Output() deleteEmitter = new EventEmitter<string>();

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tags = this.tagService.mapAllTags(this.ppa.postPreview.tags);
  }

  deleteFromPosts(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
