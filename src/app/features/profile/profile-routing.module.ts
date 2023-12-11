import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { MyProfileSettingsPageComponent } from './pages/my-profile-settings-page/my-profile-settings-page.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'me',
    component: MyProfilePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'me/settings',
    component: MyProfileSettingsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: ':authorId',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
