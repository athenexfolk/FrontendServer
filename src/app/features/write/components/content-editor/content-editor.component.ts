import { Component } from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import CodeBlock from "../../../../core/editor-tool/code-block";
import Tad, {IOModel, IOModelType, TadConfig, TadSetIOCallback} from "../../../../core/editor-tool/tad";
import {filter, map, Subject} from "rxjs";

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss'],
})
export class ContentEditorComponent {
  IO$!: Subject<IOModel>;
  editor!: EditorJS;

  onClick() {
    this.IO$.next({ type: IOModelType.output, data: 'From ang' });
  }

  getIO: TadSetIOCallback = (io) => {
    console.info('set IO from EJ ');
    this.IO$ = io;
    this.IO$.pipe(
      filter((i) => i.type == 'input'),
      map((i) => i.data)
    ).subscribe(this.onInput);
  };

  onInput(data: string) {
    console.log('resived input : ', data);
  }

  ngOnInit() {
    let tcf: TadConfig = {
      name: 'Anirut',
      setIO: this.getIO,
    };

    this.editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'ไอเดียสุดบรรเจิด...',
      tools: {
        codeBlock: CodeBlock,
        // tad : {
        //   class: Tad as any,
        //   config : tcf
        // }
      },
    });
  }
}
