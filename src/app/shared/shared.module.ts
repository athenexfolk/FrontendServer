import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { TagComponent } from './components/tag/tag.component';
import { MiniPostComponent } from './components/mini-post/mini-post.component';
import { AuthorBarComponent } from './components/author-bar/author-bar.component';



@NgModule({
  declarations: [
    NavigationHeaderComponent,
    TagComponent,
    MiniPostComponent,
    AuthorBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    NavigationHeaderComponent,
    TagComponent,
    MiniPostComponent,
    AuthorBarComponent
  ]
})
export class SharedModule { }
