import {
  API, BlockAPI,
  BlockTool,
  BlockToolData,
} from "@editorjs/editorjs";
import {filter, map, Subject} from "rxjs";
import {Action} from "../types/Action";


///    Necesary Funcion     ///

/**
 * Callback type for passing Subject Observable
 */
export type TadSetIOCallback = Action<Subject<IOModel>>;
/**
 * Type of I/O
 */
export enum IOModelType{
  input = "input",
  output = "output"
}
/**
 * Model to communicate I/O between component by Observer
 */
export interface IOModel{
  type : IOModelType;
  data: string;
}
/**
 * Tool configuration
 */
export interface TadConfig {
  name: string,
  setIO: TadSetIOCallback,
}




///      Tool     //

type TadToolBlogOption = { data: string, config: TadConfig, api: API, block: BlockAPI, readOnly: boolean };
export default class Tad implements BlockTool {

  config?:TadConfig;
  wrapper!: HTMLDivElement;
  IO$  = new Subject<IOModel>();

  constructor({ data, config, api, block, readOnly } : TadToolBlogOption) {
    this.config = config;
    this.subscriptIO();
    config!.setIO(this.IO$)

  }

  render(): HTMLElement {
    this.createUI();
    return this.wrapper;
  }



  save(block: HTMLElement): BlockToolData {
    return undefined;
  }

  static get toolbox() {
    return {
      title: 'Tad',
      icon: 'T',
    };
  }

  destroy(){
    this.closeIO();
  }




  ///    My method     ///

  private subscriptIO(){
    this.IO$
      .pipe(
        filter(i=>i.type=="output"),
        map(i=>i.data)
      )
      .subscribe(this.onOutput);
  }

  private onOutput(data:string){
    console.log(data)
  }

  private sendInput(data:string){
    this.IO$.next({
      type:IOModelType.input,
      data: data
    });
  }

  private closeIO(){
    this.IO$.complete();
  }




  ///   UI   ///
  private createUI() {
    this.wrapper = document.createElement('div');
    let name = document.createElement('p3')
    let btn = document.createElement('button')

    name.innerHTML = this.config?.name + "</br>" || "Not Found";
    btn.innerText = 'click'
    btn.addEventListener('click', this.sendToNG)

    this.wrapper.appendChild(name)
    this.wrapper.appendChild(btn)
  }
  sendToNG = () => {
    this.IO$.next({type:IOModelType.input,data:"hello"})
  }
}
