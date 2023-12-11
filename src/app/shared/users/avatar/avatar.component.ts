import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() size: number = 10;
  @Input() src: string = 'assets/images/default-avatar.svg';
  @Input() hasShadow = false;

  readonly avatarEndpoint = '/api/img/v1/avatar/';

  onAvatarError(e: Event) {
    let el = e.target as HTMLImageElement;
    el.src = 'assets/images/default-avatar.svg';
    el.onerror = null;
  }
}
