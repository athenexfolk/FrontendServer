import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostService } from '../../../../core/services/post.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { PostAndAuthor } from '../../../../core/models/post-and-author';
import { UserService } from '../../../../core/services/user.service';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { PostDataService } from '../../../../core/services/post-data.service';

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [
    CommonModule,
    OverlayComponent,
    PostComponent,
  ],
  templateUrl: './new-post-page.component.html',
  styleUrl: './new-post-page.component.scss',
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  isPublishingViewOpen = false;
  isPublished = false;

  pa!: PostAndAuthor;

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService,
    private authority: AuthorityService,
    private pds: PostDataService
  ) {}

  ngOnInit(): void {
    this.pds.clearPostData();

    this.userService.getUser(this.authority.user_id!).subscribe((author) => {
      this.pa = {
        author: author!,
        post: {
          id: '',
          authorId: '',
          title: '',
          description: '',
          tags: [],
          content: '',
          createdTime: new Date(),
          lastUpdatedTime: new Date(),
          isPublished: false,
        },
      };
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
        .addPost({
          title: this.pds.title,
          description: this.pds.description,
          coverImage: '',
          tags: this.pds.tags,
          content: this.pds.content,
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
            this.postService.addPost({
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
