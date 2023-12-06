import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { PostAndAuthor } from '../../../core/models/post-and-author';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostDescriptionComponent } from '../post-description/post-description.component';
import { PostCoverComponent } from '../post-cover/post-cover.component';
import { TagFactoryComponent } from '../../tags/tag-factory/tag-factory.component';
import { PostContentComponent } from '../post-content/post-content.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileHeaderComponent,
    PostTitleComponent,
    PostDescriptionComponent,
    PostCoverComponent,
    TagFactoryComponent,
    PostContentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() isEditable = false;
  @Input() pa!: PostAndAuthor;
}
