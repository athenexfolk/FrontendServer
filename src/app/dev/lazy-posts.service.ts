import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PostPreviewAndAuthor } from '../core/models/post-and-author';
import { PostService } from '../core/services/post.service';

type LoadMoreOptions = {
  author?: string;
  completeCallback: () => void;
  zeroLengthHandler: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class LazyPostsService {
  private _posts$: BehaviorSubject<PostPreviewAndAuthor[]>;
  private _pivot$: BehaviorSubject<string | null>;

  get posts$() {
    return this._posts$;
  }

  get posts() {
    return this._posts$.value;
  }

  private get pivot$() {
    return this._pivot$;
  }

  private get pivot() {
    return this._pivot$.value;
  }

  constructor(private postService: PostService) {
    this._posts$ = new BehaviorSubject<PostPreviewAndAuthor[]>([]);
    this._pivot$ = new BehaviorSubject<string | null>(null);
  }

  loadMore({ zeroLengthHandler, completeCallback, author }: LoadMoreOptions) {
    this.postService
      .getAllPosts({ size: 20, pivot: this.pivot, author })
      .pipe(
        tap((newPosts) => {
          if (newPosts.length > 0) {
            const lastPivot = newPosts[newPosts.length - 1].postPreview.id;
            this.posts$.next([...this.posts, ...newPosts]);
            this.pivot$.next(lastPivot);
          } else {
            zeroLengthHandler();
          }
        })
      )
      .subscribe({
        complete: () => completeCallback(),
      });
  }

  onPostAdd(addingPost: PostPreviewAndAuthor) {
    this.posts$.next([addingPost, ...this.posts]);
  }

  onPostUpdate(updatingPost: PostPreviewAndAuthor) {
    const index = this.posts.findIndex(
      (pa) => pa.postPreview.id === updatingPost.postPreview.id
    );

    if (index === -1) {
      this.onPostAdd(updatingPost);
      return;
    }

    const updatedPosts = [...this.posts];
    updatedPosts[index] = updatingPost;
    this.posts$.next(updatedPosts);
  }

  onPostDelete(deletingPostId: string) {
    const index = this.posts.findIndex(
      (pa) => pa.postPreview.id === deletingPostId
    );

    if (index !== -1) {
      const updatedPosts = this.posts$.value.filter(
        (pa) => pa.postPreview.id !== deletingPostId
      );
      this.posts$.next(updatedPosts);
    }
  }
}
