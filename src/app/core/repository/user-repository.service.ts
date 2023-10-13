import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  #BASE_URL = new URL('http://localhost:4200');
  #USER_ENDPOINT = new URL('/api/auth/v1/profiles', this.#BASE_URL);

  constructor(private http: HttpClient) { }

  getUsersByIds(userIds: string[]) {
    let params = new HttpParams();
    for (let id of userIds) {
      params = params.append('uid', id);
    }
    return this.http.get<User[]>(this.#USER_ENDPOINT.toString(), {
      params,
    });
  }
}
