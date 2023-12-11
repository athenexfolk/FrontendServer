import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, switchMap, tap } from 'rxjs';
import { UserInformationService } from '../../../core/services/user-information.service';
import { AuthorityService } from '../../../core/auth/authority.service';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.scss',
})
export class FollowButtonComponent implements OnInit, OnChanges {
  @Input({ required: true }) userId!: string;
  @Input() isFollowed = false;

  isMe = false;
  isLoggedIn = false;

  private clickSubject = new Subject<void>();

  constructor(
    private userInformationService: UserInformationService,
    private auth: AuthorityService
  ) {
    this.clickSubject
      .pipe(
        debounceTime(500),
        switchMap(() => this.toggleFollowInternal())
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.isMe = this.auth.user_id === this.userId;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedin;
  }

  debouncedToggleFollow() {
    this.clickSubject.next();
  }

  private toggleFollowInternal() {
    return this.isFollowed ? this.unfollow() : this.follow();
  }

  follow() {
    this.isFollowed = true;
    return this.userInformationService.follow(this.userId).pipe(
      tap({
        error: () => {
          this.isFollowed = false;
        },
      })
    );
  }

  unfollow() {
    this.isFollowed = false;
    return this.userInformationService.unfollow(this.userId).pipe(
      tap({
        error: () => {
          this.isFollowed = true;
        },
      })
    );
  }
}
