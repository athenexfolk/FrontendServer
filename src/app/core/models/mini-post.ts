import { Author } from "./author";
import { Tag } from "./tag";

export interface MiniPost {
  id: string;
  title: string;
  subtitle: string;
  coverImage?: URL;
  createdTime: Date;
  tags: Tag[];
  author: Author
}