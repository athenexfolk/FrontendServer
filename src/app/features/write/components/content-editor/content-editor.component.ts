import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import NestedList from '@editorjs/nested-list';
import { Subject, filter, map } from 'rxjs';
import { IO, IOCallback, IOType } from 'src/app/core/models/io';
import CodeBlock, { CodeBlockConfig } from 'src/app/core/tools/code-block';

@Component({
  selector: 'ContentEditor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss'],
})
export class ContentEditorComponent implements OnDestroy {
  @Input() content = '';
  @Output() contentChange = new EventEmitter<string>();

  editor!: EditorJS;

  output = '';
  IO$!: Subject<IO>;
  currentSentBlockId = '';

  ngOnInit(): void {
    
    let codeBlockConfig: CodeBlockConfig = {
      name: 'code-block',
      setIO: this.getIO,
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
      },
      onChange: () => {
        this.editor.save().then((output) => {
          this.contentChange.emit(JSON.stringify(output));
        });
      },
    });
  }

  ngOnDestroy(): void {
      this.editor.destroy()
  }

  getIO: IOCallback = (io) => {
    this.IO$ = io;
    this.IO$.pipe(
      filter((io) => io.type == IOType.INPUT),
      map((io) => io.data)
    ).subscribe(this.onExecuteCode);    
  };

  onExecuteCode(data: string) {
    // console.log('receive input : ', data);
  }

  onReceiveResponse() {
    // this.IO$.next({ type: IOType.OUTPUT, data: 'Output' });
  }
}
