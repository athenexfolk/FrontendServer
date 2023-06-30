import {BlockTool, BlockToolData} from "@editorjs/editorjs";
import loader, { Monaco } from '@monaco-editor/loader';

export default class CodeBlock implements BlockTool {

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
    this.editor.style.height = '200px'
    return this.wrapper;
  }

  save(block: HTMLElement): BlockToolData {
    return undefined;
  }

  rendered() {
    this.createMonaco()
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

  createMonaco() {
    loader.init().then(monaco => {
      let monacoEditor = monaco.editor.create(this.editor, {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: 'html',
        theme: 'vs-dark'
      });
      // this.GetCodeContents = ()=> monacoEditor.getValue();
    });
  }
}
