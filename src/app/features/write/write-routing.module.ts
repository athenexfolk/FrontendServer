import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritePageComponent } from './pages/write-page/write-page.component';

const routes: Routes = [
  {
    path: "",
    component: WritePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteRoutingModule { }
