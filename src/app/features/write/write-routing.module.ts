import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostPageComponent } from './pages/new-post-page/new-post-page.component';
import { EditPostPageComponent } from './pages/edit-post-page/edit-post-page.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/new-post-page/new-post-page.component').then(
        (m) => m.NewPostPageComponent
      ),
    canDeactivate: [
      (componet: NewPostPageComponent) => componet.canDeactivate(),
    ],
  },
  {
    path: 'edit/:postId',
    loadComponent: () =>
      import('./pages/edit-post-page/edit-post-page.component').then(
        (m) => m.EditPostPageComponent
      ),
    canDeactivate: [
      (componet: EditPostPageComponent) => componet.canDeactivate(),
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteRoutingModule {}
