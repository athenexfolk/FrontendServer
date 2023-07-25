import { Component, Input } from '@angular/core';
import { Author } from 'src/app/core/models/author';

@Component({
  selector: 'PostOwner',
  templateUrl: './post-owner.component.html',
  styleUrls: ['./post-owner.component.scss']
})
export class PostOwnerComponent {
  @Input() author: Author = {
    id: "1",
    username: "John Standy",
    avatar: "https://ui-avatars.com/api/?name=John+Standy"
  }
}
