import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { PostAndAuthor } from 'src/app/core/models/post-and-author';
import { Post } from 'src/app/core/models/post-response';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {

  pa!: PostAndAuthor;
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  checkImage(imageString: string) {
    if (!imageString.length) return 'assets/images/default-image.svg';
    return imageString;
  }

  ngOnInit(): void {
    let obsv$ = this.route.params.pipe(
      switchMap((params) => {
        const id = params['postId'];
        return this.postService.getSinglePostById(id);
      })
    );
    obsv$.subscribe({
      next: (pa) => {
        this.pa = pa;
      },
    });
  }
}
