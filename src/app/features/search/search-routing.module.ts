import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagSearchPageComponent } from './page/tag-search-page/tag-search-page.component';
import { BlankTagPageComponent } from './pages/blank-tag-page/blank-tag-page.component';
import { ResultTagPageComponent } from './pages/result-tag-page/result-tag-page.component';

const routes: Routes = [
  {
    path: 'tags',
    component: TagSearchPageComponent,
    children: [
      {
        path: '',
        component: ResultTagPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
