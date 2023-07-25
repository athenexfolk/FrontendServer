import { Author } from './author';
import { Tag } from './tag';

export interface CompletePost {
  id: string;
  author: Author;
  title: string;
  subtitle: string;
  content?: string;
  cover?: URL;
  createAt: Date;
  lastUpdate?: Date;
  tags: Tag[];
}
