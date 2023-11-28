import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { PostOptionsComponent } from '../post-options/post-options.component';
import { CoverComponent } from '../cover/cover.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';

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
  date = new Date("12-12-2001");
}
