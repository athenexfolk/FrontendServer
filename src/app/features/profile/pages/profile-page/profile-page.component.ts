import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../shared/users/avatar/avatar.component';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, AvatarComponent, PostPreviewComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
