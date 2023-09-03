import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorProfile } from '../models/author';
import { PostsResponse } from 'src/app/features/read/models/post-response';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #BASE_URL = new URL('http://localhost:4200');
  #POST_ENDPOINT = new URL('/api/blog/v1/posts', this.#BASE_URL);
  #AUTHOR_ENDPOINT = new URL('/api/auth/v1/profiles', this.#BASE_URL);

  constructor(private http: HttpClient) {}

  getProfileFromId(id: string) {
    let params = new HttpParams();
    params = params.append('uid', id);
    return this.http.get<AuthorProfile[]>(this.#AUTHOR_ENDPOINT.toString(), {
      params,
    });
  }

  // getPostFromAuthorId(id: string) {
  //   return this.http.get<PostsResponse>(this.#POST_ENDPOINT.toString()).pipe(
  //     filter()
  //   )
  // }
}
