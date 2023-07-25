import { Component, Input } from '@angular/core';

@Component({
  selector: 'FollowButton',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent {
  setFollowText = (followState: boolean) =>
    followState ? 'Following' : 'Follow';
  @Input() isFollowed = false;
  toggleFollow() {
    this.isFollowed = !this.isFollowed;
  }
}
