import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePageComponent } from './pages/write-page/write-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: "",
    component: WritePageComponent
  },
  {
    path: "edit/:editPostId",
    component: EditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteRoutingModule { }
