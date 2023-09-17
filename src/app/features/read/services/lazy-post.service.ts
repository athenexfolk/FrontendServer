import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { PostPreviewAndAuthor } from 'src/app/core/models/post-and-author';
import { PostPreview, PostsResponse } from '../models/post-response';
import { Author } from 'src/app/core/models/author';

@Injectable({
  providedIn: 'root',
})
export class LazyPostService {
  #BASE_URL = new URL('http://localhost:4200');
  #POST_ENDPOINT = new URL('/api/blog/v1/posts', this.#BASE_URL);
  #AUTHOR_ENDPOINT = new URL('/api/auth/v1/profiles', this.#BASE_URL);

  posts$: BehaviorSubject<PostPreviewAndAuthor[]>
  pivot$: BehaviorSubject<string | null>

  constructor(private http: HttpClient) {
    this.posts$ = new BehaviorSubject<PostPreviewAndAuthor[]>([]);
    this.pivot$ = new BehaviorSubject<string | null>(null)
  }

  loadMore(callback: () => void = () => {}) {
    this.getPostPreviewsWithAuthor(20, this.pivot$.value).pipe(
      tap((r) => {
        const lastPostPreview = r[r.length - 1].postPreview;
        this.pivot$.next(lastPostPreview.id);
        this.posts$.next([...this.posts$.value, ...r]);
      })
    ).subscribe({
      complete: () => callback()
    });
  }

  private getPostPreviewsWithAuthor(
    size: number = 20,
    pivot: string | null = null
  ) {
    let endpoint = new URL(this.#POST_ENDPOINT);
    endpoint.searchParams.set('take', size.toString());
    endpoint.searchParams.set('before', pivot ?? '');

    return this.http
      .get<PostsResponse>(endpoint.toString())
      .pipe(switchMap(this.loadAuthor));
  }

  private loadAuthor = (posts: PostsResponse) => {
    const postPreviews = posts.data?.data ?? [];
    const authorIds = postPreviews.map((postPreview) => postPreview.authorId);
    return this.bindPostWithAuthor(postPreviews, authorIds);
  };

  private bindPostWithAuthor = (posts: PostPreview[], authorIds: string[]) =>
    this.getAuthorsInfo(authorIds).pipe(
      map((authors) =>
        posts.map((postPreview) => {
          return {
            postPreview: postPreview,
            author: authors.find(
              (author) => author.id === postPreview.authorId
            )!,
          } as PostPreviewAndAuthor;
        })
      )
    );

  private getAuthorsInfo(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id.toString());
    }
    return this.http.get<Author[]>(this.#AUTHOR_ENDPOINT.toString(), {
      params,
    });
  }

  // #POSTS_SUBJECT: BehaviorSubject<PostPreviewAndAuthor>;

  // private get postRefId() {
  //   return this.#POSTS_SUBJECT.value.postPreview.id;
  // }

  // public get postStream$() {
  //   return this.#POSTS_SUBJECT.pipe(
  //     filter((post) => !!post.postPreview.id && !!post.postPreview.title)
  //   );
  // }

  // constructor(private http: HttpClient) {
  //   this.#POSTS_SUBJECT = new BehaviorSubject({
  //     postPreview: { id: '' },
  //   } as PostPreviewAndAuthor);
  // }

  // loadMore(size: number = 10, callback: () => void) {
  //   this.getPostPreviewsWithAuthor(size, this.postRefId)
  //     .pipe(mergeMap((data) => data))
  //     .subscribe((data) => {
  //       this.#POSTS_SUBJECT.next(data);
  //       callback();
  //     });
  // }

  //

  // saveToSession(ppas: PostPreviewAndAuthor[]) {
  //   console.log(ppas);

  //   sessionStorage.setItem('ppas', JSON.stringify(ppas));
  // }

  // loadFromSession() {
  //   let a = JSON.parse(
  //     sessionStorage.getItem('ppas') ?? '[]'
  //   ) as PostPreviewAndAuthor[];
  //   console.log(a);

  //   from(a)
  //     .pipe(
  //       tap((i) => this.#POSTS_SUBJECT.next(i))
  //       // tap(console.log)
  //     )
  //     .subscribe();
  // }
}
