export interface PostDto {
  title: string;
  description: string;
  coverImage: string;
  content: string;
  tags: string[];
  isPublish: boolean;
}

export interface PostAddDto extends PostDto {}
export interface PostUpdateDto extends PostDto {}
