import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/core/models/tag';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-write-page',
  templateUrl: './write-page.component.html',
  styleUrls: ['./write-page.component.scss'],
})
export class WritePageComponent {
  postTitle = '';
  postDescription = '';
  postTags: Tag[] = [];
  postCoverImage = '';
  postContent = '';

  isReadyToPublish = false;

  constructor(private postService: PostService, private router: Router) {}

  openOverlay() {
    if (!this.postTitle.length) return;
    this.isReadyToPublish = true;
  }
  closeOverlay() {
    this.isReadyToPublish = false;
  }

  publish() {
    this.postService
      .addPost({
        title: this.postTitle,
        description: this.postDescription,
        coverImage: this.postCoverImage,
        content: 'hello',
        tags: this.postTags.map((tag) => tag.name),
        isPublish: true,
      })
      .subscribe({
        next: (r) => this.router.navigate(['/','post',r.data])
      });
  }
}
