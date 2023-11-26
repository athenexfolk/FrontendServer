import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import EditorJS from '@editorjs/editorjs';
import { CoverComponent } from '../../../../shared/posts/cover/cover.component';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostComponent } from '../../../../shared/posts/post/post.component';

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoverComponent,
    OverlayComponent,
    PostComponent,
  ],
  templateUrl: './new-post-page.component.html',
  styleUrl: './new-post-page.component.scss',
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  title = '';
  description = '';
  coverImage?: File;
  coverImageSrc?: string;

  editorInstance!: EditorJS;
  editorId = 'editorjs';

  isPublishingViewOpen = false;
  isUserActiveWrite = true;

  ngOnInit(): void {
    this.editorInstance = new EditorJS({
      holder: this.editorId,
      placeholder: 'เริ่มเขียนที่นี่...',
    });
  }

  ngOnDestroy(): void {
    this.editorInstance.destroy();
  }

  clearCoverImage() {
    this.coverImage = undefined;
    this.coverImageSrc = undefined;
  }

  onCoverImageChange(e: Event) {
    let el = e.target as HTMLInputElement;
    this.coverImage = el.files![0];
    this.coverImageSrc = URL.createObjectURL(this.coverImage);
  }

  onImageError(e: Event) {
    let el = e.target as HTMLImageElement;
    el.src = 'assets/images/default-image.svg';
    el.onerror = null;
  }

  openPublishingView() {
    this.isPublishingViewOpen = true;
  }

  closePublishingView() {
    this.isPublishingViewOpen = false;
  }

  canDeactivate() {
    if (confirm('ข้อมูลจะไม่ถูกบันทึก แน่ใจที่จะออกหรือไม่?')) {
      return true;
    }
    return false;
  }
}
