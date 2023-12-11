import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-love-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-button.component.html',
  styleUrl: './love-button.component.scss',
})
export class LoveButtonComponent {
  @Input({ required: true }) isLoved = false;
  @Input({ required: true }) loveCount = 0;
  @Input({ required: true }) ofPostId = '';

  private clickSubject = new Subject<void>();

  constructor(private postService: PostService) {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleLoveInternal())
      )
      .subscribe();
  }

  debouncedToggleLove() {
    this.clickSubject.next();
  }

  love() {
    this.incrementCount();
    return this.postService.likePost(this.ofPostId).pipe(
      tap({
        error: () => this.decrementCount(),
      })
    );
  }

  unlove() {
    this.decrementCount();
    return this.postService.unlikePost(this.ofPostId).pipe(
      tap({
        error: () => this.incrementCount(),
      })
    );
  }

  private incrementCount = () => {
    this.isLoved = true;
    this.loveCount++;
  };

  private decrementCount = () => {
    this.isLoved = false;
    this.loveCount--;
  };

  private toggleLoveInternal() {
    return this.isLoved ? this.unlove() : this.love();
  }
}
