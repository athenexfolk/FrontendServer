import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../models/pageable';
import { Post, PostPreview } from '../models/post-response';
import { Response } from '../models/response';
import { PostAddDto, PostUpdateDto } from '../models/post-request';

@Injectable({
  providedIn: 'root',
})
export class PostRepositoryService {
  private readonly postEndpoint = '/api/article/v1/articles';

  constructor(private http: HttpClient) {}

  getPosts(size: number = 20, pivot: string | null = null, author?: string) {
    let endpoint = this.postEndpoint;
    endpoint += '?take=' + size;
    if (pivot) {
      endpoint += '&from=<' + pivot;
    }
    if (author) {
      endpoint += '&of=' + author;
    }

    return this.http.get<Response<Pageable<PostPreview[]>>>(
      endpoint.toString()
    );
  }

  getPostById(id: string) {
    return this.http.get<Response<Post>>(`${this.postEndpoint}/${id}`);
  }

  addPost(post: PostAddDto) {
    return this.http.post<Response<string>>(this.postEndpoint.toString(), post);
  }

  deletePost(id: string) {
    return this.http.delete<Response<string>>(`${this.postEndpoint}/${id}`);
  }

  updatePost(id: string, post: PostUpdateDto) {
    return this.http.put<Response<string>>(`${this.postEndpoint}/${id}`, post);
  }

  likePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/like`, {});
  }

  unlikePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/unlike`, {});
  }

  savePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/save`, {});
  }

  unsavePost(id: string) {
    return this.http.patch(`${this.postEndpoint}/${id}/unsave`, {});
  }
}
