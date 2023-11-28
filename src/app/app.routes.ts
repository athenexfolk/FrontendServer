import { Routes } from '@angular/router';
import { MainPageComponent } from './features/read/pages/main-page/main-page.component';
import { ArticlePageComponent } from './features/read/pages/article-page/article-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PlainLayoutComponent } from './layouts/plain-layout/plain-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: 'post/:postId',
        component: ArticlePageComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    component: PlainLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'write',
    component: PlainLayoutComponent,
    loadChildren: () =>
      import('./features/write/write.module').then((m) => m.WriteModule),
  },
];
