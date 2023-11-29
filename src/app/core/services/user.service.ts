import { Injectable } from '@angular/core';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { ImageRepositoryService } from '../repositories/image-repository.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userRepo: UserRepositoryService,
    private imageRepo: ImageRepositoryService
  ) {}

  getUsers(ids: string[]) {
    return this.userRepo.getUsersByIds(ids);
  }

  getUser(id: string) {
    return this.userRepo
      .getUsersByIds([id])
      .pipe(map((users) => (users.length > 0 ? users[0] : undefined)));
  }

  updateAvatar(formData: FormData) {
    return this.imageRepo.updateAvatar(formData);
  }
}
