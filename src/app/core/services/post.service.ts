import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(size: number = 20, pivot: string | null = null) {
    return this.http.get<PostResponse[]>('/api/blog/v1/posts').pipe(
      mergeMap((posts) => posts),
      map((p) => {
        return {
          id: p.id,
          authorId: p.ownerId,
          title: p.title,
          subtitle: p.content,
          cover: new URL(p.cover) ?? null,
          createAt: p.createAt,
          tags: p.tags.map(tag=> {
            return {
              id: tag.id,
              name: tag.tagName,
              color: tag.tagColour
            }
          }),
        } as Post;
      }),
      tap(console.log)
    );
  }
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  subtitle: string;
  cover?: URL;
  createAt: Date;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

interface PostResponse {
  id: string;
  ownerId: string;
  content: string;
  title: string;
  isPublish: boolean;
  cover: string;
  lastUpdate: string;
  createAt: Date;
  tags: {id: number, tagName: string, tagColour: string}[];
}
