import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap, tap } from 'rxjs';
import { Author } from '../models/author';
import { AuthService } from './auth.service';
import { Response } from '../models/response';
import { Pageable } from '../models/pageable';
import { Post, PostPreview } from '../models/post-response';
import { PostAndAuthor, PostPreviewAndAuthor } from '../models/post-and-author';
import { PostAddDto, PostDto, PostUpdateDto } from '../models/post-request';
import { ImageResponse } from '../models/image-response';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // postRepository: Post

  private getPosts(size: number = 20, pivot: string | null = null) {
    return this.http.get<Response<Pageable<PostPreview[]>>>(
      '/api/blog/v1/posts'
    );
  }

  private getPostById(id: string) {
    return this.http.get<Response<Post>>(`/api/blog/v1/posts/${id}`);
  }

  private getAuthors(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id.toString());
    }
    return this.http.get<Author[]>('/api/auth/v1/profiles', { params });
  }

  public getAllPosts() {
    return this.getPosts().pipe(
      switchMap((response) => {
        const postPreviews = response.data?.data || [];
        const authorIds = postPreviews.map(
          (postPreview) => postPreview.authorId
        );
        return this.getAuthors(authorIds).pipe(
          map((authors) =>
            postPreviews.map((postPreview) => {
              return {
                postPreview: postPreview,
                author: authors.find(
                  (author) => author.id === postPreview.authorId
                )!,
              } as PostPreviewAndAuthor;
            })
          )
        );
      })
    );
  }

  private onError(p: any) {} // 👇👇

  public getSinglePostById(id: string) {
    return this.getPostById(id).pipe(
      filter((response) => response.isSuccess),
      switchMap((response) => {
        const post = response.data!;
        const authorIds = [post.authorId];

        return this.getAuthors(authorIds).pipe(
          map((authors) => {
            return {
              post: post,
              author: authors.find((author) => author.id === post.authorId)!,
            } as PostAndAuthor;
          })
        );
      })
    );
  }

  public addPost(post: PostAddDto) {
    return this.http.post<Response<string>>('/api/blog/v1/posts', post, {
      headers: new HttpHeaders({
        Authorization:
          this.auth.localToken?.token_type +
          ' ' +
          this.auth.localToken?.access_token,
      }),
    });
  }

  public upload(formData: FormData) {
    return this.http.post<ImageResponse>(`/api/img/v1/img`, formData, {
      headers: new HttpHeaders({
        Authorization:
          this.auth.localToken?.token_type +
          ' ' +
          this.auth.localToken?.access_token,
      }),
    });
  }

  public getImage(formData: FormData) {
    return this.upload(formData).pipe(map((response) => response.img));
  }

  public deletePost(id: string) {
    return this.http.delete<Response<string>>(`/api/blog/v1/posts/${id}`, {
      headers: new HttpHeaders({
        Authorization:
          this.auth.localToken?.token_type +
          ' ' +
          this.auth.localToken?.access_token,
      }),
    });
  }

  public updatePost(id: string, post: PostUpdateDto) {
    return this.http.put<Response<string>>(`/api/blog/v1/posts/${id}`, post, {
      headers: new HttpHeaders({
        Authorization:
          this.auth.localToken?.token_type +
          ' ' +
          this.auth.localToken?.access_token,
      }),
    });
  }
}
