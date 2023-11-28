import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [CommonModule, ProfileHeaderComponent, RelativeTimePipe],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss'
})
export class ReplyComponent {
  date = new Date("12-1-2010")
}
