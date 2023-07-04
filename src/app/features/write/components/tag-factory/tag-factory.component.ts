import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-factory',
  templateUrl: './tag-factory.component.html',
  styleUrls: ['./tag-factory.component.scss'],
})
export class TagFactoryComponent {
  tags = [
    {
      name: 'OOOO',
      color: 'orange',
    },
    {
      name: 'CSS',
      color: 'blue',
    },
    {
      name: 'JS',
      color: 'yellow',
    },
  ];

  userTags: { name: string; color: string }[] = [];

  addTag(tag: { name: string; color: string }) {
    if (this.userTags.length >= 3) {
      return;
    }
    this.userTags.push(tag);
  }

  removeTag(index: number) {
    this.userTags.splice(index, 1);
  }
}
