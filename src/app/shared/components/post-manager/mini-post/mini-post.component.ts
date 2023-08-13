import { Component, Input, OnInit } from '@angular/core';
import { PostPreviewAndAuthor } from 'src/app/core/models/post-and-author';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'MiniPost',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss'],
})
export class MiniPostComponent implements OnInit {
  @Input() ppa!: PostPreviewAndAuthor;
  isOwned = false

  constructor(private authService: AuthService) {}

  checkImage(imageString: string) {
    if (!imageString.length) return 'assets/images/default-image.svg';
    return imageString;
  }

  ngOnInit(): void {
      this.isOwned = this.ppa.author.id === this.authService.getUid()
  }
}
