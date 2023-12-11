import { User } from './user';

export interface Profile {
  userId: string;
  displayName: string;
  shortBio: string;
}

export interface DisplayName {
  userId: string,
  displayName: string;
}

export interface UserAndProfile {
  user: User;
  profile: Profile;
}

export interface ProfileUpdateDto extends Partial<Profile> {}
