import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TagComponent } from './components/tag/tag.component';
import { MiniPostComponent } from './components/mini-post/mini-post.component';
import { AuthorBarComponent } from './components/author-bar/author-bar.component';
import { BookmarkButtonComponent } from './components/bookmark-button/bookmark-button.component';

@NgModule({
  declarations: [TagComponent, MiniPostComponent, AuthorBarComponent, BookmarkButtonComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [TagComponent, MiniPostComponent, AuthorBarComponent],
})
export class SharedModule {}
