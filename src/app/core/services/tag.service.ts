import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { Tags } from '../constants/tags';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  vtags: Tag[] = Tags;
  defaultColor = '3f3f46';

  constructor() {}

  mapTag(tagName: string) {
    return (
      this.vtags.find((tag) => tag.name === tagName) ||
      this.mapUnknownTag(tagName)
    );
  }

  mapAllTags(tagNames: string[]) {
    return tagNames.map((tagName) => this.mapTag(tagName));
  }

  getColorFromTagName(tagName: string) {
    return this.mapTag(tagName).color;
  }

  mapUnknownTag(tagName: string): Tag {
    return {
      name: tagName,
      color: this.defaultColor,
    };
  }
}
