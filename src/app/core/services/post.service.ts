import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostResponse } from '../models/got-post-response';
import { map, switchMap, tap } from 'rxjs';
import { Author } from '../models/author';
import { MiniPost } from '../models/mini-post';
import { Tag } from '../models/tag';
import { Post } from '../models/post';
import { AddedPostResponse } from '../models/added-post-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getPosts(size: number = 20, pivot: string | null = null) {
    return this.http.get<PostResponse[]>('/api/blog/v1/posts');
  }

  private getPostById(id: string) {
    //Receive Array of Post now, change to PostResponse when backend updated
    return this.http.get<PostResponse>(`/api/blog/v1/posts/${id}`);
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
      switchMap((postsResponse: PostResponse[]) => {
        let authorIds = postsResponse.map(
          (postResponse: PostResponse) => postResponse.ownerId
        );
        return this.getAuthors(authorIds).pipe(
          map((authors) => {
            let miniPosts: MiniPost[] = postsResponse.map(
              (postResponse: PostResponse) => {
                let matchedAuthor = authors.find(
                  (author: Author) => author.id === postResponse.ownerId
                )!;
                return {
                  id: postResponse.id,
                  title: postResponse.title,
                  subtitle: postResponse.content,
                  createdTime: postResponse.createAt,
                  coverImage: new URL(postResponse.cover) ?? null,
                  tags: postResponse.tags.map((tag) => {
                    return {
                      name: tag.tagName,
                      color: tag.tagColour,
                    } as Tag;
                  }),
                  author: matchedAuthor,
                };
              }
            );
            return miniPosts;
          })
        );
      })
    );
  }

  public getSinglePostById(id: string) {
    return this.getPostById(id).pipe(
      switchMap((postsResponse: PostResponse) => {
        return this.getAuthors([postsResponse.ownerId]).pipe(
          map((authors) => {
            let postResponse = postsResponse;
            return {
              id: postResponse.id,
              title: postResponse.title,
              subtitle: postResponse.subTitle,
              createdTime: postResponse.createAt,
              lastUpdatedTime: postResponse.lastUpdate,
              content: postResponse.content,
              coverImage: new URL(postResponse.cover) ?? null,
              tags: postResponse.tags.map((tag) => {
                return {
                  name: tag.tagName,
                  color: tag.tagColour,
                } as Tag;
              }),
              author: authors[0],
            } as Post;
          })
        );
      })
    );
  }

  public addPost(post: AddedPostResponse) {
    return this.http
      .post<AddedPostResponse>('/api/blog/v1/posts', post, {
        headers: new HttpHeaders({
          Authorization:
            this.auth.localToken?.token_type +
            ' ' +
            this.auth.localToken?.access_token,
        }),
      })
      .pipe(tap(console.log));
  }
}
