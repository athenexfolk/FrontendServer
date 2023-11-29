import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  private readonly userEndpoint = '/api/auth/v1/profiles';

  constructor(private http: HttpClient) {}

  getUsersByIds(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id);
    }
    return this.http.get<User[]>(this.userEndpoint.toString(), {
      params,
    });
  }
}
