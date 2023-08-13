import { Author } from './author';
import { Post, PostPreview } from './post-response';

export interface PostPreviewAndAuthor {
  postPreview: PostPreview;
  author: Author;
}

export interface PostAndAuthor {
  post: Post;
  author: Author;
}