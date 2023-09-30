import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniPostComponent } from './components/post-manager/mini-post/mini-post.component';
import { TagComponent } from './components/tag-manager/tag/tag.component';
import { TagGroupComponent } from './components/tag-manager/tag-group/tag-group.component';
import { MiniPostGroupComponent } from './components/post-manager/mini-post-group/mini-post-group.component';
import { TextSkeletonComponent } from './skeleton/text-skeleton/text-skeleton.component';
import { ImageSkeletonComponent } from './skeleton/image-skeleton/image-skeleton.component';
import { PostOwnerComponent } from './components/post-manager/post-owner/post-owner.component';
import { RouterModule } from '@angular/router';
import { LoveButtonComponent } from './components/button-manager/love-button/love-button.component';
import { ShareButtonComponent } from './components/button-manager/share-button/share-button.component';
import { BookmarkButtonComponent } from './components/button-manager/bookmark-button/bookmark-button.component';
import { CommentComponent } from './components/comment-manager/comment/comment.component';
import { PostDetailsComponent } from './components/post-manager/post-details/post-details.component';
import { FollowButtonComponent } from './components/button-manager/follow-button/follow-button.component';
import { CommentGroupComponent } from './components/comment-manager/comment-group/comment-group.component';
import { CommentBoxComponent } from './components/comment-manager/comment-box/comment-box.component';
import { ClickInsideDirective } from './directives/click-inside.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { OptionsMenuComponent } from './components/post-manager/options-menu/options-menu.component';
import { SingleLineSkeletonComponent } from './skeleton/single-line-skeleton/single-line-skeleton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MiniPostComponent,
    TagComponent,
    TagGroupComponent,
    MiniPostGroupComponent,
    TextSkeletonComponent,
    ImageSkeletonComponent,
    PostOwnerComponent,
    LoveButtonComponent,
    ShareButtonComponent,
    BookmarkButtonComponent,
    CommentComponent,
    PostDetailsComponent,
    FollowButtonComponent,
    CommentGroupComponent,
    CommentBoxComponent,
    ClickInsideDirective,
    ClickOutsideDirective,
    OptionsMenuComponent,
    SingleLineSkeletonComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    MiniPostComponent,
    TagComponent,
    TagGroupComponent,
    MiniPostGroupComponent,
    TextSkeletonComponent,
    ImageSkeletonComponent,
    PostOwnerComponent,
    LoveButtonComponent,
    ShareButtonComponent,
    BookmarkButtonComponent,
    CommentComponent,
    PostDetailsComponent,
    FollowButtonComponent,
    CommentGroupComponent,
    CommentBoxComponent,
    ClickInsideDirective,
    ClickOutsideDirective,
    OptionsMenuComponent,
    SingleLineSkeletonComponent,
  ],
})
export class SharedModule {}
