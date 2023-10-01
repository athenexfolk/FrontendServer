import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { Tag } from 'src/app/core/models/tag';
import { PostService } from 'src/app/core/services/post.service';
import { CodeModel } from 'src/app/core/tools/code-model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
  postId = '';
  postTitle = '';
  postDescription = '';
  postTags: Tag[] = [];
  postCoverImage = '';
  postContent = '';

  isReadyToPublish = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let id = params.get('editPostId');
          if (id) {
            this.postId = id;
            return this.postService.getSinglePostById(id);
          } else return of(null);
        })
      )
      .subscribe({
        next: (pa) => {
          if (pa) {
            let p = pa.post;
            this.postTitle = p.title;
            this.postDescription = p.description;
            // this.postTags = p.tags
            this.postCoverImage = p.coverImage;
            this.postContent = p.content;
          }
        },
      });
  }

  openOverlay() {
    if (!this.postTitle.length) return;
    this.isReadyToPublish = true;
  }
  closeOverlay() {
    this.isReadyToPublish = false;
  }

  update() {
    this.postService
      .updatePost(this.postId, {
        title: this.postTitle,
        description: this.postDescription,
        coverImage: this.postCoverImage,
        content: this.postContent,
        tags: this.postTags.map((tag) => tag.name),
        isPublish: true,
      })
      .subscribe({
        complete: () => {
          this.router.navigate(['/', 'post', this.postId]);
          sessionStorage.clear();
        },
      });
  }

  
}
