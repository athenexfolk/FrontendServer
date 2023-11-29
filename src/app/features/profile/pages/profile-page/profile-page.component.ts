import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../shared/users/avatar/avatar.component';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user.service';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post-and-author';
import { AuthorityService } from '../../../../core/auth/authority.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, AvatarComponent, PostPreviewComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  user!: User;
  myId: string | null = null;
  ppas: PostPreviewAndAuthor[] = [];

  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authority: AuthorityService,
    private lazyPostService: LazyPostService
  ) {}

  ngOnInit(): void {
    this.myId = this.authority.user_id;

    this.route.paramMap
      .pipe(
        map((params) => {
          const authorId = params.get('authorId');
          if (!authorId) {
            throw new Error('Invalid Author ID');
          }
          return authorId;
        }),
        switchMap((authorId) => this.userService.getUser(authorId)),
        map((user) => {
          if (!user) {
            throw new Error('Invalid User');
          }
          return user;
        }),
        tap((user) => (this.user = user)),
        switchMap(() =>
          this.lazyPostService.posts$
            .asObservable()
            .pipe(
              map((ppas) =>
                ppas.filter((post) => post.author.id === this.user.id)
              )
            )
        ),
        tap(() => this.lazyPostService.loadMore())
      )
      .subscribe((ppas) => (this.ppas = ppas));
  }

  postTrackBy(index: number, item: PostPreviewAndAuthor) {
    return item.postPreview.id;
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

  loadPostOnScroll() {
    setTimeout(
      () =>
        this.lazyPostService.loadMore(
          undefined,
          () => (this.readyStatus = true),
          () => (this.endLoad = true)
        ),
      1000
    );
  }
}
