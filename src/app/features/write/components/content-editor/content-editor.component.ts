import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import CodeBlock, { CodeBlockConfig } from 'src/app/core/tools/code-block';
import { CodeModel } from 'src/app/core/tools/code-model';
import ImageBlock, { ImageBlockConfig } from 'src/app/core/tools/image-block';
import { ImageRepositoryService } from 'src/app/core/repository/image-repository.service';
import { TokenService } from 'src/app/core/auth/token.service';

@Component({
  selector: 'ContentEditor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss'],
})
export class ContentEditorComponent implements OnDestroy {
  @Input() content = '';
  @Output() contentChange = new EventEmitter<string>();

  editor!: EditorJS;
  isEditorInitialized = false;

  autoSave!: any;

  code: CodeModel | null = null;
  isShowCodePage: boolean = true;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.initEditorJS();
  }

  ngOnDestroy(): void {
    this.editor.isReady.then(() => {
      this.editor.destroy();
    });
  }

  onExecuteCode(data: string) {
    // console.log('receive input : ', data);
  }

  onReceiveResponse() {
    // this.IO$.next({ type: IOType.OUTPUT, data: 'Output' });
  }

  getCodeFromEditor() {}

  initEditorJS() {
    let codeBlockConfig: CodeBlockConfig = {
      name: 'code-block',
      event: this.getCodeData,
    };

    let imageBlockConfig: ImageBlockConfig = {
      token: this.tokenService.token
    };

    this.editor = new EditorJS({
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
        image: {
          class: ImageBlock as any,
          config: imageBlockConfig,
        },
      },
      onChange: () => {
        clearTimeout(this.autoSave);
        this.autoSave = setTimeout(
          () =>
            this.editor.save().then((output) => {
              this.contentChange.emit(JSON.stringify(output));
            }),
          1000
        );
      },
      onReady: () => {
        if (this.content.length) this.editor.render(JSON.parse(this.content));
      },
    });
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
}
