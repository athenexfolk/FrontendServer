import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @Input() src: string = ''
  @Input() name: string = ''
  @Input() authorId: string = ''
}
