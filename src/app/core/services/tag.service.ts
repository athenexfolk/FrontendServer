import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { Tags } from '../constants/tags';
import { TagRepositoryService } from '../repositories/tag-repository.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  vtags: Tag[] = Tags;
  defaultColor = '3f3f46';

  constructor(private tagRepo: TagRepositoryService) {}

  getTopTags() {
    return this.tagRepo
      .getTopTags(20)
      .pipe(map((tags) => tags.map((tag) => this.mapTag(tag.key))));
  }

  mapTag(tagName: string) {
    return (
      this.vtags.find(
        (tag) => tag.name === tagName
      ) || this.mapUnknownTag(tagName)
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
      name: tagName
        // .split(' ')
        // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        // .join(' '),
        ,
      color: this.defaultColor,
    };
  }
}
