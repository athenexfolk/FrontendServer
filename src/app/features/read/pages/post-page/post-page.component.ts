import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  post: Post
  constructor(private route: ActivatedRoute, private postService: PostService){
    this.post = {
      id: '',
      author: {
        id: '',
        avatar: '',
        username: '',
      },
      content: '',
      createdTime: new Date(),
      lastUpdatedTime: new Date(),
      subtitle: '',
      tags: [],
      title: '',
      coverImage: undefined
    }
  }

  ngOnInit(): void {
    let obsv$ = this.route.params.pipe(
      switchMap(params => {
        const id = params['postId'];
        return this.postService.getSinglePostById(id);
      })
    );
    obsv$.subscribe({
      next: (post) => this.post = post,
      complete: () => console.log(this.post)
      
    })
  }
  
  
}
