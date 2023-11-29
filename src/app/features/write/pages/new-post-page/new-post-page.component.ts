import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import CodeBlock, { CodeBlockConfig } from '../../../../core/tools/code-block';
import ImageBlock from '../../../../core/tools/image-block';

import { CoverComponent } from '../../../../shared/posts/cover/cover.component';
import { OverlayComponent } from '../../../../shared/ui/overlay/overlay.component';
import { PostComponent } from '../../../../shared/posts/post/post.component';
import { CodeModel } from '../../../../core/tools/code-model';

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

  code: CodeModel | null = null;

  editorInstance!: EditorJS;
  editorId = 'editorjs';

  isPublishingViewOpen = false;
  isUserActiveWrite = true;

  isShowCodePage = true;


  ngOnInit(): void {
    this.initEditorJS()
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
