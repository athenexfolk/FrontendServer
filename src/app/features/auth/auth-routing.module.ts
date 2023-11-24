import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/signin-page/signin-page.component').then(
        (m) => m.SigninPageComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup-page/signup-page.component').then(
        (m) => m.SignupPageComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
