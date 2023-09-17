import { Author } from "./author";

export interface Comment {
  _id: string;
  postId: string;
  commentOwnerId: string;
  data: string;
  timestamp: Date;
  replyToId: string;
}

export interface CommentAndOwner {
  comment: Comment;
  owner: Author
}
