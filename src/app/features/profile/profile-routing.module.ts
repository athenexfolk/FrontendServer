import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { authGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingPageComponent,
    canActivate: [authGuard]
  },
  {
    path: ":authorId",
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
