import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagCount } from '../models/tag';
import { Response } from '../models/response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagRepositoryService {
  private readonly tagEndpoint = '/api/article/v1/tags';

  constructor(private http: HttpClient) {}

  getTopTags(n: number) {
    const params = new HttpParams({ fromObject: { n } });

    return this.http
      .get<Response<TagCount[]>>(`${this.tagEndpoint}`, {
        params,
      })
      .pipe(map((res) => res.data || []));
  }
}
