import { Component } from '@angular/core';
import { Tag } from 'src/app/core/models/tag';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-write-page',
  templateUrl: './write-page.component.html',
  styleUrls: ['./write-page.component.scss'],
})
export class WritePageComponent {
  postTitle = '';
  postSubtitle = '';
  postTags: Tag[] = [];
  postCoverImage = '';
  postContent = '';

  isReadyToPublish = false

  constructor(private postService: PostService) {}

  openOverlay() {
    if(!this.postTitle.length) return
    this.isReadyToPublish = true
  }
  closeOverlay() {
    this.isReadyToPublish = false
  }

  publish() {
    console.log(this.postTitle);
    console.log(this.postSubtitle);
    console.log(this.postTags);
    console.log(this.postCoverImage);
    console.log(this.postContent);
    this.postService.addPost({
      title: this.postTitle,
      cover: this.postCoverImage,
      content: 'hello',
      tags: [],
      isPublish: true
    }).subscribe({
      next: r => console.log(r),
      error: console.log,
      complete: () => console.log('completed')
      
    })
  }
}
