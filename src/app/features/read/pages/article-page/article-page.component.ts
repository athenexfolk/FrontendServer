import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { CommentSectionComponent } from '../../../../shared/comments/comment-section/comment-section.component';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [CommonModule, PostComponent, CommentSectionComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  isLoadComment = false;
  loadCommentSection() {
    this.isLoadComment = true;
  }
}
