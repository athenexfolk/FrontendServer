import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss'
})
export class ReplyComponent {

}
