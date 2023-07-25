import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import EditorJS from '@editorjs/editorjs';

@Component({
  selector: 'ContentEditor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss'],
})
export class ContentEditorComponent implements OnDestroy {
  @Input() content = '';
  @Output() contentChange = new EventEmitter<string>();

  editor!: EditorJS;

  ngOnInit(): void {
    this.editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        console.log('ready');
      },
      placeholder: 'สร้างสรรค์ไอเดียสุดบรรเจิด...',
      onChange: () => {
        this.editor.save().then((output) => {
          this.contentChange.emit(JSON.stringify(output));
        });
      },
    });
  }

  ngOnDestroy(): void {
      this.editor.destroy()
  }
}
