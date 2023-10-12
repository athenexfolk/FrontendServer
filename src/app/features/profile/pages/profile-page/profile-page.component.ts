import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthorityService } from 'src/app/core/auth/authority.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  author: User | undefined;
  isMyId = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthorityService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          let authorId = params.get('authorId');
          if (authorId) return this.userService.getUser(authorId);
          return of(undefined);
        })
      )
      .subscribe((author) => {
        this.author = author;
        this.isMyId = this.auth.user_id === this.author?.id;
      });
  }

  getAvatar() {
    return '/api/img/v1/avatar/' + this.author?.id;
  }
}
