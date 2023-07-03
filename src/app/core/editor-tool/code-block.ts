import {BlockTool, BlockToolData} from "@editorjs/editorjs";
import loader from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

export default class CodeBlock implements BlockTool {

  monacoEditor? : editor.IStandaloneCodeEditor;

  wrapper!: HTMLDivElement
  editor!: HTMLDivElement
  input!: HTMLInputElement



  constructor() {
    this.wrapper = document.createElement('div')
    this.editor = document.createElement('div')
    this.input = document.createElement('input')
  }
  render(): HTMLElement {
    this.wrapper.classList.add('border','p-2')
    this.input.classList.add('p-2', 'focus:outline-0')
    this.input.placeholder = 'ชื่อไฟล์'
    this.wrapper.appendChild(this.input)
    this.wrapper.appendChild(this.editor)
    this.editor.style.height = '190px'
    return this.wrapper;
  }

  save(block: HTMLElement): BlockToolData {
    return undefined;
  }

  rendered() {
    this.createMonaco();
  }

  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return {
      title: 'CodeBlock',
      icon: 'C',
    };
  }




  async createMonaco() {
    let monaco = await loader.init();
    let option : editor.IStandaloneEditorConstructionOptions = {
      value: "function hello() {\n\talert('Hello world!');\n}",
      language: 'javascript',
      theme: 'vs-dark'
    }

    this.monacoEditor = monaco.editor.create(this.editor,option);
  }
}
