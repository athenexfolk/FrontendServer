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
import { Runner } from 'src/app/sockets/runner';
import { FitAddon } from 'xterm-addon-fit';

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

  isServerReady = false;
  isExecuting = false;
  executeState: 'loading' | 'ready' = 'ready';

  prompt = '';
  inputBuffer = '';

  constructor(private runner: Runner) {}

  ngOnInit() {
    this.runner.connect();
    this.runner.isConnected$.subscribe(
      (status) => (this.isServerReady = status)
    );

    this.runner.output$.subscribe((stdout) => {
      console.log(stdout);

      if (stdout.data && stdout.type !== 'exit') {
        this.terminal.write(stdout.data, () => {
          this.executeState = 'ready';
        });
      }
      if (stdout.type === 'exit') {
        this.terminal.write('Exit with status code ' + stdout.data);
        this.terminal.writeln(this.prompt);
        this.abort();
      }
      this.terminal.write(this.prompt);
    });
    this.runner.error$.subscribe(console.error);
  }

  ngAfterViewInit() {
    loader.init().then((monaco) => {
      this.monacoEditor = monaco.editor.create(
        this.codeEditorRef.nativeElement,
        {
          value: this.code.code,
          language: this.code.language,
        }
      );
    });

    const fitAddon = new FitAddon();
    this.terminal = new Terminal({
      convertEol: true,
      cursorBlink: true,
    });

    this.terminal.loadAddon(fitAddon);
    this.terminal.open(this.terminalRef.nativeElement);
    fitAddon.fit();

    this.terminal.write(this.prompt);

    this.terminal.onData((input) => {
      if (input === '\r') {
        this.terminal.writeln('');
        //Waiting for input event
        this.useInputBuffer();
        this.terminal.write(this.prompt);
      } else if (input === '\u007f') {
        if (this.terminal.buffer.active.cursorX > 0) {
          this.terminal.write('\b \b');
          this.inputBuffer = this.inputBuffer.slice(0, -1);
        }
      } else {
        this.terminal.write(input);
        //store buffer
        this.inputBuffer += input;
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
    this.executeState = 'loading';
    this.terminal.clear();
    this.runner.run({
      language: 'python3',
      sourcecode: this.monacoEditor.getValue(),
    });
  }

  abort() {
    this.isExecuting = false;
  }

  closePage() {
    this.abort();
    this.closeCommand.emit();
  }

  useInputBuffer() {
    console.log(this.inputBuffer);
    this.runner.input(this.inputBuffer)
    this.inputBuffer = '';
  }
}
