import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  author: User | undefined;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
      .subscribe((author) => (this.author = author));
  }
}
