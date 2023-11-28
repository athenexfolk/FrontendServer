import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../../../../shared/posts/cover/cover.component';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [CommonModule, CoverComponent, OverlayComponent, PostComponent],
  templateUrl: './edit-post-page.component.html',
  styleUrl: './edit-post-page.component.scss',
})
export class EditPostPageComponent implements OnInit {
  title = '';
  description = '';
  coverImage?: File;
  coverImageSrc? = '';

  isPublishingViewOpen = false;

  editorId = 'editorjs';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      // this.route.paramMap.pipe(
      //   switchMap(params => {
      //     if(!params.get('postId')) throw new Error('Invalid Post ID');
      //     return this.
      //   })
      // )
  }

  clearCoverImage() {}
  onCoverImageChange(e: Event) {}

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
