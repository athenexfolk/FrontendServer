import { Tag } from "./tag";

export interface AddedPostResponse {
    title: string;
    cover: string;
    content: string
    tags: Tag[];
    isPublish: boolean
}