import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthorProfile } from 'src/app/core/models/author';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  authorProfile: AuthorProfile = {
    id: '',
    username: '',
    avatar: '',
    isFollower: false,
    isFollowing: false,
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let a = params.get('userId') || '';
          return this.profileService.getProfileFromId(a);
        })
      )
      .subscribe((res) => {
        this.authorProfile = res[0];
      });
  }

  imageSource = () => {
    if (this.authorProfile.avatar && this.authorProfile.avatar.length)
      return '/api/img/v1/' + this.authorProfile.avatar;
    return 'assets/images/default-avatar.svg';
  };
}
