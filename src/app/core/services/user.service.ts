import { Injectable } from '@angular/core';
import { UserRepositoryService } from '../repository/user-repository.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userRepo: UserRepositoryService
  ) {}

  getUsers(ids: string[]) {
    return this.userRepo.getUsersByIds(ids);
  }

  getUser(id: string) {
    return this.userRepo
      .getUsersByIds([id])
      .pipe(map((users) => (users.length > 0 ? users[0] : undefined)));
  }
}
