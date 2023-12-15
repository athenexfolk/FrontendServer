import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post-and-author';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';
import { AuthorityService } from '../../../../core/auth/authority.service';

@Component({
  selector: 'app-result-tag-page',
  standalone: true,
  imports: [CommonModule, PostPreviewComponent],
  templateUrl: './result-tag-page.component.html',
  styleUrl: './result-tag-page.component.scss',
})
export class ResultTagPageComponent implements OnInit, OnDestroy {
  tagSubscription = new Subscription();
  ppas: PostPreviewAndAuthor[] = [];

  userId: string | null = null;

  isTagValid = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authorityService: AuthorityService
  ) {}

  ngOnInit(): void {
    this.userId = this.authorityService.user_id;
    this.tagSubscription = this.route.queryParamMap
      .pipe(
        filter((qm) => {
          if (qm.getAll('tag').length <= 0) {
            this.isTagValid = false;
            return false;
          }
          this.isTagValid = true
          return true;
        }),
        switchMap((qm) => {
          return this.postService.getAllPosts({
            size: 10,
            pivot: null,
            tags: qm.getAll('tag'),
          });
        })
      )
      .subscribe((ppas) => (this.ppas = ppas));
  }

  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }
}
