import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { CoverComponent } from '../cover/cover.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { PostPreviewAndAuthor } from '../../../core/models/post-and-author';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProfileHeaderComponent,
    PostOptionsComponent,
    CoverComponent,
    RelativeTimePipe
  ],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss',
})
export class PostPreviewComponent {
  @Input() userId: string | null = null
  @Input() ppa!: PostPreviewAndAuthor
}
