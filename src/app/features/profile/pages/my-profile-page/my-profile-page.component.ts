import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../../shared/users/profile/profile.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { Observable, Subscription, map, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Profile } from '../../../../core/models/profile';
import { LazyPostService } from '../../../../core/services/lazy-post.service';
import { PostPreviewAndAuthor } from '../../../../core/models/post-and-author';
import { PostPreviewComponent } from '../../../../shared/posts/post-preview/post-preview.component';

@Component({
  selector: 'app-my-profile-page',
  standalone: true,
  imports: [CommonModule, ProfileComponent, RouterLink, PostPreviewComponent],
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.scss',
})
export class MyProfilePageComponent implements OnInit {
  me$!: Observable<Profile>;
  myId: string | null = null;
  ppas: PostPreviewAndAuthor[] = [];
  @ViewChild('postgroup') postgroup!: ElementRef<HTMLElement>;
  readyStatus = true;
  endLoad = false;

  postSubscription = new Subscription();

  constructor(
    private userInformationService: UserInformationService,
    private lazyPostService: LazyPostService,
    private authorityService: AuthorityService
  ) {}

  ngOnInit(): void {
    this.myId = this.authorityService.user_id;
    this.me$ = this.userInformationService.getUserProfile(
      this.authorityService.user_id!
    );

    this.postSubscription = this.lazyPostService.posts$
      .asObservable()
      .pipe(
        map((ppas) =>
          ppas.filter(
            (post) => post.author.userId === this.authorityService.user_id!
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
