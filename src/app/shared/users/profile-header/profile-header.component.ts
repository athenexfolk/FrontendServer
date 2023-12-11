import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
import { AuthorityService } from '../../../core/auth/authority.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarComponent, FollowButtonComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  @Input() name: string = '';
  @Input() authorId: string = '';
}
