import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post-and-author';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { ProfileComponent } from '../../../../shared/users/profile/profile.component';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Profile } from '../../../../core/models/profile';
import { FollowButtonComponent } from '../../../../shared/users/follow-button/follow-button.component';
import { FollowersComponent } from '../../../../shared/users/followers/followers.component';
import { FolloweesComponent } from '../../../../shared/users/followees/followees.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    PostPreviewComponent,
    FollowButtonComponent,
    FollowersComponent,
    FolloweesComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user$!: Observable<Profile>;
  isFollow$!: Observable<{ isFollowed: boolean }>;
  ppas: PostPreviewAndAuthor[] = [];

  myId: string | null = null;

  postSubscription = new Subscription();

  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  constructor(
    private route: ActivatedRoute,
    private authority: AuthorityService,
    private lazyPostService: LazyPostService,
    private userInformationService: UserInformationService
  ) {}

  ngOnInit(): void {
    this.myId = this.authority.user_id;
    let authorId$ = this.route.paramMap.pipe(
      map((params) => {
        const authorId = params.get('authorId');
        if (!authorId) {
          throw new Error('Invalid Author ID');
        }
        return authorId;
      })
    );

    this.user$ = authorId$.pipe(
      switchMap((authorId) =>
        this.userInformationService.getUserProfile(authorId)
      )
    );

    this.isFollow$ = authorId$.pipe(
      switchMap((authorId) => this.userInformationService.getFollow(authorId)),
      map((relation) => ({ isFollowed: !!relation })),
    );

    this.postSubscription = authorId$
      .pipe(
        switchMap((authorId) =>
          this.lazyPostService.posts$
            .asObservable()
            .pipe(
              map((ppas) =>
                ppas.filter((post) => post.author.userId === authorId)
              )
            )
        ),
        tap(() => this.lazyPostService.loadMore())
      )
      .subscribe((ppas) => (this.ppas = ppas));
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
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
