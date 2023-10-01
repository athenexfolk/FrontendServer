import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import loader from '@monaco-editor/loader';
import { CodeModel } from 'src/app/core/tools/code-model';
import type * as monaco from 'monaco-editor'

@Component({
  selector: 'CodePage',
  templateUrl: './code-page.component.html',
  styleUrls: ['./code-page.component.scss'],
})
export class CodePageComponent implements AfterViewInit, OnDestroy {
  @Input() code!: CodeModel;
  @Output() closeCommand = new EventEmitter();

  @ViewChild('codeEditor') codeEditorRef!: ElementRef<HTMLElement>;

  monacoEditor!: monaco.editor.IStandaloneCodeEditor;

  isExecuting = false;

  ngAfterViewInit(): void {
    loader.init().then((monaco) => {
      this.monacoEditor = monaco.editor.create(this.codeEditorRef.nativeElement, {
        value: this.code.code,
        language: this.code.language,
        readOnly: true
      });
    });
  }

  output = 'Waiting for code...';

  ngOnDestroy(): void {
    if (this.monacoEditor) {
      this.monacoEditor.dispose();
    }
  }

  execute() {
    this.isExecuting = true;
    this.output = 'Executing...';

  }

  abort() {
    this.isExecuting = false;
    this.output = 'Clearing...'
  }

  closePage() {
    this.abort()
    this.closeCommand.emit();
  }
}
