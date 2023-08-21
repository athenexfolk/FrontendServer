import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';
import { Author } from '../models/author';
import { PostAndAuthor, PostPreviewAndAuthor } from '../models/post-and-author';
import { PostAddDto, PostUpdateDto } from '../models/post-request';
import { PostRepositoryService } from '../repository/post-repository.service';
import { ImageRepositoryService } from '../repository/image-repository.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private postRepo: PostRepositoryService,
    private imageRepo: ImageRepositoryService
  ) {}

  private getAuthors(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id.toString());
    }
    return this.http.get<Author[]>('/api/auth/v1/profiles', { params });
  }

  getAllPosts() {
    return this.postRepo.getPosts().pipe(
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

  getSinglePostById(id: string) {
    return this.postRepo.getPostById(id).pipe(
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

  addPost(post: PostAddDto) {
    return this.postRepo.addPost(post);
  }

  deletePost(id: string) {
    return this.postRepo.deletePost(id);
  }

  updatePost(id: string, post: PostUpdateDto) {
    return this.postRepo.updatePost(id, post);
  }

  uploadImage(formData: FormData) {
    return this.imageRepo.uploadImage(formData);
  }
}
