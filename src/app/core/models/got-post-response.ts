export interface PostResponse {
  id: string;
  ownerId: string;
  content: string;
  title: string;
  subTitle: string;
  isPublish: boolean;
  cover: string;
  lastUpdate: Date;
  createAt: Date;
  tags: { id: number; tagName: string; tagColour: string }[];
}
