import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Input({ required: true }) isSaved = false;
  @Input({ required: true }) ofPostId = '';

  private clickSubject = new Subject<void>();

  constructor(private postService: PostService) {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleSaveInternal())
      )
      .subscribe();
  }

  debouncedToggleLove() {
    this.clickSubject.next();
  }

  save() {
    this.saved();
    return this.postService.likePost(this.ofPostId).pipe(
      tap({
        error: () => this.unsaved(),
      })
    );
  }

  unsave() {
    this.unsaved();
    return this.postService.unlikePost(this.ofPostId).pipe(
      tap({
        error: () => this.save(),
      })
    );
  }

  private saved = () => {
    this.isSaved = true;
  };

  private unsaved = () => {
    this.isSaved = false;
  };

  private toggleSaveInternal() {
    return this.isSaved ? this.unsave() : this.save();
  }
}
