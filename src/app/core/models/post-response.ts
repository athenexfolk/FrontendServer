import { Identifiable } from './identifiable';
import { Traceable } from './traceable';

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