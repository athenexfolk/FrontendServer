import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { Profile } from '../../../core/models/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input({ required: true }) userProfile!: Profile;
}
