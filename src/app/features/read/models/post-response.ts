import { Identifiable } from "src/app/core/models/identifiable";
import { Pageable } from "src/app/core/models/pageable";
import { Response } from "src/app/core/models/response";
import { Traceable } from "src/app/core/models/traceable";

export interface PostPreview extends Traceable, Identifiable {
  title: string;
  description: string;
  coverImage: string;

  tags: string[];
  tagsDetails?: Map<string, string>[];

  likedCount?: number;

  isPublished: boolean;
  isSave?: boolean;
  isLiked?: boolean;
}

export interface Post extends PostPreview {
  content: string;
}

export type PostsResponse = Response<Pageable<PostPreview[]>>