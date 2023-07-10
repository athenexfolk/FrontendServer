import { Component, OnInit } from '@angular/core';
import { Post, PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'PostsPanel',
  templateUrl: './posts-panel.component.html',
  styleUrls: ['./posts-panel.component.scss'],
})
export class PostsPanelComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) {
    this.posts = [];
  }
  
  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: this.getHomePost,
      complete: () => console.log("Post is loaded : ",this.posts),
    });
  }

  private getHomePost = (post: Post) => {
    this.posts.push(post)
  }

}
