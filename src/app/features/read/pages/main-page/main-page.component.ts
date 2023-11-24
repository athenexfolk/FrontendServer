import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostPreviewComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  userStatus = false;
  title = 'โปรแกรมเมอร์มือหนึ่ง';
  description =
    'เบต้าบล็อกให้บริการในการเขียนบทความในรูปแบบบล็อก โดยอำนวยความสะดวกให้โปรแกรมเมอร์โดยการเพิ่มฟังก์ชันในการเขียนโค้ด และสั่งให้โค้ดทำงาน ขณะนี้ ระบบของเราให้บริการในภาษา C, C++, Python, Java';
}
