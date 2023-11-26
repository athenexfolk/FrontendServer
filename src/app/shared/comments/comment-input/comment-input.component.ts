import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {

}
