import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import CodeBlock, { CodeBlockConfig } from '../../../core/tools/code-block';
import ImageBlock, { ImageBlockConfig } from '../../../core/tools/image-block';
import { TokenService } from '../../../core/auth/token.service';
import { HttpClient } from '@angular/common/http';
import { PostDataService } from '../../../core/services/post-data.service';
import { CodeModel } from '../../../core/tools/code-model';
import { CodeRunnerComponent } from '../../contents/code-runner/code-runner.component';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [CommonModule, CodeRunnerComponent],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.scss',
})
export class PostContentComponent implements OnInit, OnChanges {
  @Input() content = '';
  @Output() contentSaved = new EventEmitter<string>();

  @Input() isEditable = false;

  editor?: EditorJS;
  autoSave: any;
  isSaving = false;

  isShowCodePage = false;
  currentCode: CodeModel | null = null;

  constructor(
    private postDataService: PostDataService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content'] && this.editor) {
      this.renderContent();
    }
  }

  ngOnInit(): void {
    this.editor = this.loadEditor();
    this.editor.isReady.then(() => {
      this.renderContent();
    });
  }

  getCodeData = (code: CodeModel) => {
    this.openCodePage();
    this.currentCode = code;
  };

  openCodePage() {
    this.isShowCodePage = true;
  }

  closeCodePage() {
    this.currentCode = null;
    this.isShowCodePage = false;
  }

  loadEditor() {
    const codeBlockConfig: CodeBlockConfig = {
      name: 'code-block',
      event: this.getCodeData,
    };

    const imageBlockConfig: ImageBlockConfig = {
      token: this.tokenService.token,
      httpClient: (cb: (http: HttpClient) => void) => {
        cb(this.http);
      },
      onUploadCompleate: () => {
        // console.log('Upload image compleate.');
      },
      onUploadFailure: (e) => {
        // console.error('Upload image fail : ', e.mess);
      },
    };

    return new EditorJS({
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
        image: {
          class: ImageBlock as any,
          config: imageBlockConfig,
        },
      },
      placeholder: 'สร้างสรรค์ไอเดียสุดบรรเจิด...',
      readOnly: !this.isEditable,
      onChange: () => {
        this.isSaving = true;

        clearTimeout(this.autoSave);
        this.autoSave = setTimeout(() => {
          this.editor?.save().then((output) => {
            const content = JSON.stringify(output);
            this.contentSaved.emit(content);
            this.postDataService.content = content;
            this.isSaving = false;
          });
        }, 1500);
      },
    });
  }

  renderContent() {
    if (!this.content.length) return;
    const content = this.content;
    this.postDataService.content = this.content;
    this.editor?.render(JSON.parse(content) as OutputData);
  }
}
