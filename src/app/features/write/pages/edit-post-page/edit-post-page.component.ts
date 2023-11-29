import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../../../../shared/posts/cover/cover.component';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { CodeModel } from '../../../../core/tools/code-model';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import CodeBlock, { CodeBlockConfig } from '../../../../core/tools/code-block';
import ImageBlock from '../../../../core/tools/image-block';

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
  data = '';

  code: CodeModel | null = null;

  editorInstance!: EditorJS;
  editorId = 'editorjs';

  isPublishingViewOpen = false;

  isShowCodePage = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const postId = params.get('postId');
          if (!postId) {
            throw new Error('Invalid Post ID');
          }
          return this.postService.getSinglePostById(postId);
        })
      )
      .subscribe({
        next: (pa) => {
          this.title = pa.post.title;
          this.description = pa.post.description;
          this.coverImageSrc = pa.post.coverImage;
          this.data = pa.post.content;
        },
        complete: () => this.initEditorJS(),
      });
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

  getCodeData = (code: CodeModel) => {
    this.openCodePage();
    this.code = code;
  };

  openCodePage() {
    this.isShowCodePage = true;
  }

  closeCodePage() {
    this.isShowCodePage = false;
  }

  initEditorJS() {
    let codeBlockConfig: CodeBlockConfig = {
      name: 'code-block',
      event: this.getCodeData,
    };

    // let imageBlockConfig: ImageBlockConfig = {
    //   token: this.tokenService.token,
    //   httpClient: (cb:(http:HttpClient)=>void)=>{cb(this.http)},
    //   onUploadCompleate : ()=>{ console.log("Upload image compleate.") },
    //   onUploadFailure : e =>{ console.error("Upload image fail : ", e.mess) },
    // };

    this.editorInstance = new EditorJS({
      holder: 'editorjs',
      placeholder: 'สร้างสรรค์ไอเดียสุดบรรเจิด...',
      tools: {
        header: Header,
        delimiter: Delimiter,
        table: Table,
        inlineCode: InlineCode,
        nestedList: NestedList,
        codeBlock: {
          class: CodeBlock as any,
          config: codeBlockConfig,
        },
        // image: {
        //   class: ImageBlock as any,
        //   config: imageBlockConfig,
        // },
      },
      data: JSON.parse(this.data) as OutputData
      // onChange: () => {
      //   clearTimeout(this.autoSave);
      //   this.autoSave = setTimeout(
      //     () =>
      //       this.editor.save().then((output) => {
      //         this.contentChange.emit(JSON.stringify(output));
      //       }),
      //     1000
      //   );
      // },
    });
  }
}
