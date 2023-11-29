import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { CommentSectionComponent } from '../../../../shared/comments/comment-section/comment-section.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { PostAndAuthor } from '../../../../core/models/post-and-author';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, PostComponent, CommentSectionComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  isLoadComment = false;
  post$!: Observable<PostAndAuthor>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      map((params) => {
        const postId = params.get('postId');
        if (!postId) {
          throw new Error('Invalid post ID');
        }
        return postId;
      }),
      switchMap((postId) => this.postService.getSinglePostById(postId))
    );
  }

  loadCommentSection() {
    this.isLoadComment = true;
  }
}
