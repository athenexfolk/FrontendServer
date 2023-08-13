import { Component, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';

@Component({
  selector: 'PostOwner',
  templateUrl: './post-owner.component.html',
  styleUrls: ['./post-owner.component.scss'],
})
export class PostOwnerComponent {
  @Input() author: Author = {
    id: '0',
    username: 'username',
    avatar: '',
    isFollower: false,
    isFollowing: false,
  };

  imageSource = () => {
    if (this.author.avatar && this.author.avatar.length)
      return '/api/img/v1/' + this.author.avatar;
    return 'assets/images/default-avatar.svg';
  };
}
