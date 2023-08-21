import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';
import { Pageable } from '../models/pageable';
import { Post, PostPreview } from '../models/post-response';
import { PostAddDto, PostUpdateDto } from '../models/post-request';

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService {
  

  constructor(private http: HttpClient) {}

  getPosts(size: number = 20, pivot: string | null = null) {
    return this.http
      .get<Response<Pageable<PostPreview[]>>>('/api/blog/v1/posts');
  }

  getPostById(id: string) {
    return this.http.get<Response<Post>>(`/api/blog/v1/posts/${id}`);
  }

  addPost(post: PostAddDto) {
    return this.http.post<Response<string>>('/api/blog/v1/posts', post);
  }

  deletePost(id: string) {
    return this.http.delete<Response<string>>(`/api/blog/v1/posts/${id}`);
  }

  updatePost(id: string, post: PostUpdateDto) {
    return this.http.put<Response<string>>(`/api/blog/v1/posts/${id}`, post);
  }
}
