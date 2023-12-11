import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationService } from '../../../core/services/user-information.service';
import { Followers } from '../../../core/models/follow';
import { AvatarComponent } from '../avatar/avatar.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { OverlayComponent } from '../../ui/overlay/overlay.component';
import { switchMap, tap } from 'rxjs';
import { DisplayName } from '../../../core/models/profile';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    OverlayComponent,
    ProfileHeaderComponent,
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnInit, OnChanges {
  @Input({ required: true }) authorId!: string;

  followers!: Followers;
  leftCount = 0;

  isShowAllOpen = false;

  profileHeader: DisplayName[] = [];

  constructor(private userInformationService: UserInformationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authorId']) {
      this.loadFollowers().subscribe();
    }
  }

  ngOnInit(): void {}

  openShowAll() {
    this.isShowAllOpen = true;
  }

  closeShowAll() {
    this.isShowAllOpen = false;
  }

  loadFollowers() {
    return this.userInformationService.getFollowers(this.authorId).pipe(
      tap((followers) => {
        if (followers.followerIds.length >= 5) {
          this.followers = {
            followeeId: followers.followeeId,
            followerIds: followers.followerIds.slice(0, 5),
          };
          this.leftCount = followers.followerIds.length - 5;
        } else {
          this.followers = followers;
        }
      }),
      switchMap(() => {
        const followers = this.followers.followerIds;
        return this.userInformationService.getDisplayName(followers);
      }),
      tap((followers) => {
        this.profileHeader = followers;
      })
    );
  }
}
