export interface Author {
  id: string;
  username: string;
  avatar: string;

  isFollower: boolean;
  isFollowing: boolean;
}

export interface AuthorProfile extends Author {
  
}