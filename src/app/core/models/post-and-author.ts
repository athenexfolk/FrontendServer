import { Post, PostPreview } from './post-response';
import { DisplayName } from './profile';
import { User } from './user';

export interface PostPreviewAndAuthor {
  postPreview: PostPreview;
  author: DisplayName;
}

export interface PostAndAuthor {
  post: Post;
  author: DisplayName;
}
