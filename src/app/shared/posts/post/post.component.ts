import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileHeaderComponent } from '../../users/profile-header/profile-header.component';
import EditorJS from '@editorjs/editorjs';
import { CoverComponent } from '../cover/cover.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileHeaderComponent,
    CoverComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnDestroy {
  title = 'การสร้างโพสต์ในเว็บเบต้าบล็อก';
  description = 'ทดสอบทำอะไรสักอย่างในนี้ดู';
  coverImageSrc?: string = 'kk';

  editorInstance!: EditorJS;
  editorId = 'postContent';

  ngOnInit(): void {
    this.editorInstance = new EditorJS({
      holder: this.editorId,
      placeholder: 'เริ่มเขียนที่นี่...',
      readOnly: true,
      data: {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'หัวใจเต้นแรง',
            },
          }
        ]
      }
    });
  }

  ngOnDestroy(): void {
    this.editorInstance.destroy();
  }
}
