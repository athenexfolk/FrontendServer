import { Injectable } from '@angular/core';
import { UserInformationRepositoryService } from '../repositories/user-information-repository.service';
import { ProfileUpdateDto } from '../models/profile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInformationService {
  constructor(private userInformationRepo: UserInformationRepositoryService) {}

  getUserProfile(userId: string) {
    return this.userInformationRepo
      .getProfileById(userId)
      .pipe(
        map(
          (profile) => profile || { userId, displayName: userId, shortBio: '' }
        )
      );
  }

  updateProfile(profileUpdate: ProfileUpdateDto) {
    return this.userInformationRepo.updateProfile(profileUpdate);
  }

  getDisplayName(userIds: string[]) {
    return this.userInformationRepo.getDisplayNameByIds(userIds);
  }

  follow(userId: string) {
    return this.userInformationRepo.follow(userId);
  }

  unfollow(userId: string) {
    return this.userInformationRepo.unfollow(userId);
  }
  
  getFollow(userId: string) {
    return this.userInformationRepo.getFollow(userId);
  }

  getFollowers(userId: string) {
    return this.userInformationRepo.getFollowersOf(userId);
  }

  getFollowees(userId: string) {
    return this.userInformationRepo.getFolloweesOf(userId);
  }
}
