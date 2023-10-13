import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { reverseAuthGuard } from './core/guard/reverse-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/read/read.module').then((m) => m.ReadModule),
  },
  {
    path: 'auth',
    canActivate: [reverseAuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'write',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/write/write.module').then((m) => m.WriteModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
