import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'BookmarkButton',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss'],
})
export class BookmarkButtonComponent {
  @Input() postId = '';
  @Input() isBookmarked = false;

  constructor(private postService: PostService) {}

  saveBookmark() {
    this.isBookmarked = true;
    this.postService.savePost(this.postId);
  }

  unsaveBookmark() {
    this.isBookmarked = false;
    this.postService.unsavePost(this.postId);
  }

  toggleBookmark() {
    if (this.isBookmarked) {
      this.unsaveBookmark();
    } else {
      this.saveBookmark();
    }
  }
}
