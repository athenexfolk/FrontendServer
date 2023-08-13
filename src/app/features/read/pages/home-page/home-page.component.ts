import { Component, OnInit } from '@angular/core';
import { PostPreviewAndAuthor } from 'src/app/core/models/post-and-author';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  userStatus = false;
  title = 'กำเนิดโปรแกรมเมอร์';
  description =
    'เบต้าบล็อกให้บริการในการเขียนบทความในรูปแบบบล็อก โดยอำนวยความสะดวกให้โปรแกรมเมอร์โดยการเพิ่มฟังก์ชันในการเขียนโค้ด และสั่งให้โค้ดทำงาน ขณะนี้ ระบบของเราให้บริการในภาษา C, C++, Python, Java';

  ppas: PostPreviewAndAuthor[];

  constructor(private postService: PostService, private auth: AuthService) {
    this.ppas = [];
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(userStatus => this.userStatus = userStatus);
    this.postService.getAllPosts().subscribe({
      next: (res) => (this.ppas = res),
      complete: console.log,
    });
  }
}
