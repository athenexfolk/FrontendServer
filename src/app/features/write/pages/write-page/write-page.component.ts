import {Component, OnInit} from '@angular/core';
import EditorJS from "@editorjs/editorjs";
import CodeBlock from "../../../../core/editor-tool/code-block";
import Tad, {IOModel, IOModelType, TadConfig, TadSetIOCallback} from "../../../../core/editor-tool/tad";
import {filter, map, Subject} from "rxjs";

@Component({
  selector: 'app-write-page',
  templateUrl: './write-page.component.html',
  styleUrls: ['./write-page.component.scss']
})
export class WritePageComponent implements OnInit {
  IO$! : Subject<IOModel>;
  editor!: EditorJS
  image: string = ''
  isCoverImageValid = false
  isSearchTagFocus = false
  noti = false
  tags = [
    {
      name: "HTML",
      color: "orange"
    },
    {
      name: "CSS",
      color: "blue"
    },
    {
      name: "JS",
      color: "yellow"
    }
  ]

  constructor() {
  }

  userTags: {name:string, color:string}[] = []

  onFileUpload(e: Event){
    let input = e.target as HTMLInputElement
    if(!input.files?.item(0))
      return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(input.files[0])
    fileReader.onload = () => {
      this.image = fileReader.result!.toString();
      this.isCoverImageValid = true
    }
  }

  addTag(tag: {name:string, color:string}){
    if(this.userTags.length >= 3){
      this.noti = true
      return
    }
    this.userTags.push(tag)
  }

  onClick() {
    this.IO$.next({type:IOModelType.output, data:"From ang"})
  }

  getIO :TadSetIOCallback = io => {
    console.info("set IO from EJ ")
    this.IO$ = io;
    this.IO$
      .pipe(
        filter(i=>i.type=="input"),
        map(i=>i.data)
      )
      .subscribe(this.onInput)
  }

  onInput(data:string){
    console.log("resived input : ",data)
  }

  ngOnInit() {
    let tcf : TadConfig = {
      name : "Anirut",
      setIO: this.getIO,
    };

    this.editor = new EditorJS({
      holder: "editorjs",
      placeholder: "ไอเดียสุดบรรเจิด...",
      tools: {
        codeBlock: CodeBlock,
        // tad : {
        //   class: Tad as any,
        //   config : tcf
        // }
      }
    })
  }



}



