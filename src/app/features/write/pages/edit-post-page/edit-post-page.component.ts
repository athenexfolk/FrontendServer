import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { PostAndAuthor } from '../../../../core/models/post-and-author';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [CommonModule, OverlayComponent, PostComponent],
  templateUrl: './edit-post-page.component.html',
  styleUrl: './edit-post-page.component.scss',
})
export class EditPostPageComponent implements OnInit, OnDestroy {
  isPublishingViewOpen = false;
  isPublished = false;

  pa!: PostAndAuthor;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private pds: PostDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pds.clearPostData();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const postId = params.get('postId');
          if (!postId) {
            throw new Error('Invalid Post ID');
          }
          return this.postService.getSinglePostById(postId);
        })
      )
      .subscribe({
        next: (pa) => {
          this.pa = pa;
        },
      });
  }

  ngOnDestroy(): void {
    this.pds.clearPostData();
  }

  openPublishingView() {
    this.isPublishingViewOpen = true;
  }

  closePublishingView() {
    this.isPublishingViewOpen = false;
  }

  canDeactivate() {
    if (this.isPublished) return true;
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
  }

  publish() {
    if (!this.pds.coverImage) {
      this.postService
        .updatePost(this.pa.post.id, {
          title: this.pds.title,
          description: this.pds.description,
          coverImage: this.pds.coverImageSrc || '',
          content: this.pds.content,
          tags: this.pds.tags,
          isPublish: true,
        })
        .subscribe({
          next: (r) => {
            this.isPublished = true;
            this.router.navigate(['/', 'post', r.data]);
            this.pds.clearPostData();
          },
        });
    } else {
      let formData = new FormData();
      formData.append('img', this.pds.coverImage);

      this.postService
        .uploadImage(formData)
        .pipe(
          switchMap((coverImage) =>
            this.postService.updatePost(this.pa.post.id, {
              title: this.pds.title,
              description: this.pds.description,
              coverImage: '/api/img/v1/img/' + coverImage.img,
              content: this.pds.content,
              tags: this.pds.tags,
              isPublish: true,
            })
          )
        )
        .subscribe({
          next: (r) => {
            this.router.navigate(['/', 'post', r.data]);
            this.pds.clearPostData();
          },
        });
    }
  }
}
