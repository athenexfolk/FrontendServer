import { Component } from '@angular/core';
import { AuthorityService } from 'src/app/core/auth/authority.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
})
export class SettingPageComponent {
  me!: User;

  avatar = '';
  avatarFileB64 = '';
  displayName = '';
  bio = '';

  avatarFile: File | undefined;

  constructor(
    private auth: AuthorityService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUser(this.auth.user_id!).subscribe((user) => {
      if (user) {
        this.me = user;
        this.avatar = user.avatar;
        this.displayName = user.username;
        this.bio = user.username;
      }
    });
  }

  getAvatar() {
    return '/api/img/v1/' + this.avatar;
  }

  onFileChange(e: Event) {
    let input = e.target as HTMLInputElement;
    if (!input.files?.item(0)) return;
    this.avatarFile = input.files[0];
    this.avatarFileB64 = URL.createObjectURL(this.avatarFile);
  }

  updateProfile() {
    if (this.avatarFile) {
      let formData = new FormData();
      formData.append('avatar', this.avatarFile);
      this.userService
        .updateAvatar(formData)
        .subscribe(() => console.log('Avatar updated'));
    }
  }

  setAvatar(newAvatar: string) {
    this.avatar = newAvatar;
  }
}
