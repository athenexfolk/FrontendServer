import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PostPreviewAndAuthor } from '../models/post-and-author';
import { PostService } from './post.service';

type LoadMoreOptions = {
  author?: string;
  completeCallback: () => void;
  zeroLengthHandler: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class LazyPostService {
  private _posts$: BehaviorSubject<PostPreviewAndAuthor[]>;
  private _pivot$: BehaviorSubject<string | null>;

  get posts$() {
    return this._posts$.asObservable();
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
    this.loadMore({ completeCallback: () => {}, zeroLengthHandler: () => {} });
  }

  loadMore({ zeroLengthHandler, completeCallback, author }: LoadMoreOptions) {    
    this.postService
      .getAllPosts({ size: 20, pivot: this.pivot, author })
      .pipe(
        tap((newPosts) => {
          if (newPosts.length > 0) {
            const lastPivot = newPosts[newPosts.length - 1].postPreview.id;
            this._posts$.next([...this.posts, ...newPosts]);
            this._pivot$.next(lastPivot);
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
    this._posts$.next([addingPost, ...this.posts]);
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
    this._posts$.next(updatedPosts);
  }

  onPostDelete(deletingPostId: string) {
    const index = this.posts.findIndex(
      (pa) => pa.postPreview.id === deletingPostId
    );

    if (index !== -1) {
      const updatedPosts = this._posts$.value.filter(
        (pa) => pa.postPreview.id !== deletingPostId
      );
      this._posts$.next(updatedPosts);
    }
  }
}
