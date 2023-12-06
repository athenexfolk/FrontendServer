import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  private _title = '';
  private _description = '';
  private _coverImage?: File = undefined;
  private _coverImageSrc? = '';
  private _tags: string[] = [];
  private _content = '';

  constructor() {}

  clearPostData() {
    this._title = '';
    this._description = '';
    this._coverImage = undefined;
    this._coverImageSrc = '';
    this._tags = [];
    this._content = '';

    console.log('post data was cleared');
  }

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description() {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get coverImage() {
    return this._coverImage;
  }

  set coverImage(value: File | undefined) {
    this._coverImage = value;
  }

  get coverImageSrc() {
    return this._coverImageSrc;
  }

  set coverImageSrc(value: string | undefined) {
    this._coverImageSrc = value;
  }

  get tags() {
    return this._tags;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  get content() {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
