import {Component, OnInit} from '@angular/core';
import EditorJS from "@editorjs/editorjs";

@Component({
  selector: 'app-write-page',
  templateUrl: './write-page.component.html',
  styleUrls: ['./write-page.component.scss']
})
export class WritePageComponent implements OnInit {
  editor!: EditorJS
  ngOnInit() {
    this.editor = new EditorJS({
      holder: "editorjs",
      placeholder: "ไอเดียสุดบรรเจิด..."
    })
  }
}
