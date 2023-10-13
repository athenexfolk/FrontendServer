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
import type * as monaco from 'monaco-editor';
import { Terminal } from 'xterm';

@Component({
  selector: 'CodePage',
  templateUrl: './code-page.component.html',
  styleUrls: ['./code-page.component.scss'],
})
export class CodePageComponent implements AfterViewInit, OnDestroy {
  @Input() code!: CodeModel;
  @Output() closeCommand = new EventEmitter();

  @ViewChild('codeEditor') codeEditorRef!: ElementRef<HTMLElement>;
  @ViewChild('terminal') terminalRef!: ElementRef<HTMLElement>;

  monacoEditor!: monaco.editor.IStandaloneCodeEditor;
  terminal!: Terminal;

  isExecuting = false;

  prompt = '$ ';
  output = 'Waiting for code...';

  ngAfterViewInit() {
    loader.init().then((monaco) => {
      this.monacoEditor = monaco.editor.create(
        this.codeEditorRef.nativeElement,
        {
          value: this.code.code,
          language: this.code.language,
          readOnly: true,
        }
      );
    });

    this.terminal = new Terminal();
    this.terminal.open(this.terminalRef.nativeElement);
    this.terminal.write(this.prompt);
    this.terminal.onData((input) => {
      if (input === '\r') {
        this.terminal.writeln('');
        this.terminal.write(this.prompt);
      } else if (input === '\u007f') {
        if (this.terminal.buffer.active.cursorX > 2)
          this.terminal.write('\b \b');
      } else {
        this.terminal.write(input);
      }
    });
  }

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
    this.output = 'Clearing...';
  }

  closePage() {
    this.abort();
    this.closeCommand.emit();
  }

  onReceiveStdIn() {

  }

  onReceiveStdOut() {
    
  }

  onReceiveStdErr() {

  }

  onReceiveError() {

  }

  onReceiveExit() {

  }
}
