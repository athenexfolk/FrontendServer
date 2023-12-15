import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post-and-author';
import { TagService } from '../../../../core/services/tag.service';
import { TagComponent } from '../../../../shared/tags/tag/tag.component';
import { Tag } from '../../../../core/models/tag';
import { TagGroupComponent } from '../../../../shared/tags/tag-group/tag-group.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PostPreviewComponent,
    TagComponent,
    TagGroupComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  title = 'โปรแกรมเมอร์มือหนึ่ง';
  description =
    'เบต้าบล็อกให้บริการในการเขียนบทความในรูปแบบบล็อก โดยอำนวยความสะดวกให้โปรแกรมเมอร์โดยการเพิ่มฟังก์ชันในการเขียนโค้ด และสั่งให้โค้ดทำงาน ขณะนี้ ระบบของเราให้บริการในภาษา C, C++, Python, Java';

  ppas: PostPreviewAndAuthor[] = [];
  topTags: Tag[] = [];
  userId: string | null = null;
  isLoggedIn = false;

  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  constructor(
    private authorityService: AuthorityService,
    private lazyPostService: LazyPostService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.lazyPostService.posts$.subscribe((res) => {
      this.ppas = res;
    });

    this.tagService.getTopTags().subscribe((tags) => (this.topTags = tags));

    this.userId = this.authorityService.user_id;
    this.isLoggedIn = this.authorityService.isLoggedin;
  }

  postTrackBy(index: number, item: PostPreviewAndAuthor) {
    return item.postPreview.id;
  }

  removeFromId(id: string) {
    this.ppas.splice(
      this.ppas.findIndex((item) => item.postPreview.id === id),
      1
    );
  }

  @HostListener('window:scroll', ['$event'])
  scrollEvent() {
    if (
      window.scrollY + window.innerHeight >
        this.postgroup.nativeElement.offsetHeight &&
      this.readyStatus &&
      !this.endLoad &&
      this.ppas.length
    ) {
      this.readyStatus = false;
      this.loadPostOnScroll();
    }
  }

  deleteId(id: string) {
    this.ppas = this.ppas.filter((p) => p.postPreview.id !== id);
  }

  loadMore() {
    this.lazyPostService.loadMore({
      completeCallback: () => {
        this.readyStatus = true;
      },
      zeroLengthHandler: () => {
        this.endLoad = true;
      },
    });
  }

  loadPostOnScroll() {
    setTimeout(() => this.loadMore(), 1000);
  }
}
