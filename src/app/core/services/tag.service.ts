import { Injectable } from '@angular/core';
import { Tags } from '../constant/tags';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  vtags: Tag[] = Tags;

  constructor() {}

  mapTag(tagName: string) {
    return (
      this.vtags.find((tag) => tag.name === tagName) || {
        name: tagName,
        color: '3f3f46',
      }
    );
  }

  mapAllTags(tagNames: string[]) {
    return tagNames.map((tagName) => this.mapTag(tagName));
  }

  getColorFromTagName(tagName: string) {
    return this.mapTag(tagName).color
  }
}
