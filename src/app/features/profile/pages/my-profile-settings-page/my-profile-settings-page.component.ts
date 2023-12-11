import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../shared/users/avatar/avatar.component';
import { AuthorityService } from '../../../../core/auth/authority.service';
import { UserInformationService } from '../../../../core/services/user-information.service';
import { Profile } from '../../../../core/models/profile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-settings-page',
  standalone: true,
  imports: [CommonModule, AvatarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile-settings-page.component.html',
  styleUrl: './my-profile-settings-page.component.scss',
})
export class MyProfileSettingsPageComponent implements OnInit {
  @ViewChild('editName') myTemplate!: TemplateRef<any>;

  newAvatarFile?: File;
  newAvatarSrc?: string;

  myProfile!: Profile;
  constructor(
    private authority: AuthorityService,
    private userInformationService: UserInformationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInformationService
      .getUserProfile(this.authority.user_id!)
      .subscribe({
        next: (profile) => (this.myProfile = profile),
      });
  }

  onAvatarChange(e: Event) {
    let el = e.target as HTMLInputElement;
    this.newAvatarFile = el.files![0];
    this.newAvatarSrc = URL.createObjectURL(this.newAvatarFile!);
  }

  clearCoverImage() {
    this.newAvatarFile = undefined;
    this.newAvatarSrc = undefined;
  }

  updateProfile() {
    if (this.newAvatarFile) {
      const formData = new FormData();
      formData.append('avatar', this.newAvatarFile);
      this.userService.updateAvatar(formData).subscribe();
    }
    this.userInformationService
      .updateProfile({
        displayName: this.myProfile.displayName,
        shortBio: this.myProfile.shortBio,
      })
      .subscribe(() => {
        this.router.navigate(['/profile', 'me']);
      });
  }
}
