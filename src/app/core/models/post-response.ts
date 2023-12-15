import { Identifiable } from './identifiable';
import { Pageable } from './pageable';
import { Traceable } from './traceable';
import { Response } from "./response";

export interface PostPreview extends Traceable, Identifiable {
  title: string;
  description: string;
  coverImage?: string;

  tags: string[];
  tagsDetails?: Map<string, string>[];

  likeCount?: number;

  isPublished: boolean;
  isSaved?: boolean;
  isLiked?: boolean;
}

export interface Post extends PostPreview {
  content: string;
}

export type PostsResponse = Response<Pageable<PostPreview[]>>
