import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { PostOptionsComponent } from '../post-options/post-options.component';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, ProfileHeaderComponent, PostOptionsComponent],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {

}
