import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./features/read/read.module').then(m => m.ReadModule)
  },
  {
    path: "read",
    redirectTo: "/",
    pathMatch: "full"
  },
  {
    path: "write",
    loadChildren: () => import('./features/write/write.module').then(m => m.WriteModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./features/authenticate/authenticate.module').then(m => m.AuthenticateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
