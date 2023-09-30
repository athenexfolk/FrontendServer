import { Post, PostPreview } from './post-response';
import { User } from './user';

export interface PostPreviewAndAuthor {
  postPreview: PostPreview;
  author: User;
}

export interface PostAndAuthor {
  post: Post;
  author: User;
}
