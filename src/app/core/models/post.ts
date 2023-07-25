import { MiniPost } from "./mini-post";

export interface Post extends MiniPost {
  content: string;
  lastUpdatedTime?: Date;
}
