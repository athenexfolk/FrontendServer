import {
  API,
  BlockAPI,
  BlockTool,
  BlockToolConstructorOptions,
  BlockToolData,
} from '@editorjs/editorjs';

import * as monaco from 'monaco-editor';
// import loader from '@monaco-editor/loader';
// import * as editor from 'monaco-editor/esm/vs/editor/editor.api';

import { Language, availableLanguages } from './available-language';

interface CodeBlockData extends BlockToolData {
  language: string;
  code: string;
}

export interface CodeBlockConfig {
  name: string;
  event: (data: string) => void;
}

export default class CodeBlock implements BlockTool {
  api: API;
  readOnly: boolean;
  config?: CodeBlockConfig;
  block: BlockAPI;
  data: CodeBlockData = {
    language: '',
    code: '',
  };

  _wrapper!: HTMLDivElement;
  _option!: HTMLDivElement;
  _editor!: HTMLDivElement;

  _configWrapper!: HTMLDivElement;
  _filenameInput!: HTMLInputElement;
  _languageSelector!: HTMLSelectElement;
  _runButton!: HTMLButtonElement;

  // ieditor!: typeof editor.editor;
  // monacoEditor!: editor.editor.IStandaloneCodeEditor;

  monacoEditorInstance!: monaco.editor.IStandaloneCodeEditor

  constructor({
    api,
    readOnly,
    data,
    config,
    block,
  }: BlockToolConstructorOptions<CodeBlockData, CodeBlockConfig>) {
    this.api = api;
    this.readOnly = readOnly;
    this.config = config;
    this.block = block!;
    if (data) this.data = data;

    this._wrapper = this.drawView();
  }

  save() {
    return {
      // language: this.monacoEditor.getModel()?.getLanguageId(),
      // code: this.monacoEditor.getValue(),
    };
  }

  render() {
    return this._wrapper;
  }

  private loadEditor() {
    console.log('loading editor');

    this.monacoEditorInstance = monaco.editor.create(this._editor, {
      value: this.data.code || 'hello',
      language: this.data.language || 'c'
    })
    // loader.init().then((monaco) => {
    //   this.ieditor = monaco.editor;
    //   if (this.data) {
    //     console.log(this.data.code, this.data.language);

    //     this.monacoEditor = this.ieditor.create(this._editor, {
    //       value: this.data.code,
    //       language: this.data.language,
    //       readOnly: this.readOnly,
    //     });
    //   } else {
    //     this.monacoEditor = this.ieditor.create(this._editor, {
    //       value: '',
    //       language: 'c',
    //     });
    //   }
    // });
  }

  private sendToExternal(code: string) {
    this.config?.event(code);
  }

  // Struct element node: start ---> //
  private drawView() {
    this._wrapper = document.createElement('div');
    this._option = document.createElement('div');
    this._editor = document.createElement('div');

    this._wrapper.appendChild(this._option);
    this._wrapper.appendChild(this._editor);

    this._option.classList.add(this.api.styles.block, 'option-wrapper');
    this._editor.classList.add(this.api.styles.block);
    this._wrapper.classList.add(this.api.styles.block, 'code-wrapper');

    this._editor.style.height = '200px';

    this.loadEditor();
    this.structOption();

    return this._wrapper;
  }

  private structOption() {
    this.structFilenameInput();
    this.structLanguageSelector(availableLanguages);
    this.structRunButton();
    this.structConfigWrapper();

    this._option.appendChild(this._configWrapper);
    this._option.appendChild(this._runButton);
  }

  private structConfigWrapper() {
    this._configWrapper = document.createElement('div');
    this._configWrapper.classList.add('config-wrapper');

    this._configWrapper.appendChild(this._filenameInput);
    this._configWrapper.appendChild(this._languageSelector);
  }

  private structFilenameInput() {
    // const filenamePattern = /^[a-zA-Z0-9_-]+$/;
    this._filenameInput = document.createElement('input');
    this._filenameInput.type = 'text';
    this._filenameInput.placeholder = 'Enter file name';
  }

  private structLanguageSelector(lang: Language[]) {
    this._languageSelector = document.createElement('select');

    lang.forEach((l) => {
      let option = document.createElement('option');
      option.text = l.name;
      option.value = l.id;
      this._languageSelector.appendChild(option);
    });
    this._languageSelector.onchange = () => {
      this.data.language = this._languageSelector.value;

      // this.ieditor.setModelLanguage(
      //   this.monacoEditor.getModel()!,
      //   this._languageSelector.value
      // );
    };
  }

  private structRunButton() {
    this._runButton = document.createElement('button');
    this._runButton.classList.add('run-button');
    this._runButton.textContent = 'Run';

    this._runButton.addEventListener('click', () => {
      this.runCode();
    });
  }
  // Struct element node: end <-- //

  private runCode() {
    // let code = this.monacoEditor.getValue();
    // this.sendToExternal(code);
  }

  static get enableLineBreaks() {
    return true;
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: '<p style="font-family:monospace;font-weight-bold;font-size: 16px;">C</p>',
      title: 'Code Block',
    };
  }
}
