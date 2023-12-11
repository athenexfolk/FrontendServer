import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Followees } from '../../../core/models/follow';
import { UserInformationService } from '../../../core/services/user-information.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { OverlayComponent } from '../../ui/overlay/overlay.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { DisplayName } from '../../../core/models/profile';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-followees',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    OverlayComponent,
    ProfileHeaderComponent,
  ],
  templateUrl: './followees.component.html',
  styleUrl: './followees.component.scss',
})
export class FolloweesComponent implements OnChanges {
  @Input({ required: true }) authorId!: string;

  followees!: Followees;
  leftCount = 0;

  profileHeader: DisplayName[] = [];

  isShowAllOpen = false;

  constructor(private userInformationService: UserInformationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authorId']) {
      this.loadFollowees().subscribe();
    }
  }

  ngOnInit(): void {}

  openShowAll() {
    this.isShowAllOpen = true;
  }

  closeShowAll() {
    this.isShowAllOpen = false;
  }

  loadFollowees() {
    return this.userInformationService.getFollowees(this.authorId).pipe(
      tap((followees) => {
        if (followees.followeeIds.length >= 5) {
          this.followees = {
            followerId: followees.followerId,
            followeeIds: followees.followeeIds.slice(0, 5),
          };
          this.leftCount = followees.followeeIds.length - 5;
        } else {
          this.followees = followees;
        }
      }),
      switchMap(() => {
        const followees = this.followees.followeeIds;
        return this.userInformationService.getDisplayName(followees);
      }),
      tap((followees) => {
        this.profileHeader = followees;
      })
    );
  }
}
