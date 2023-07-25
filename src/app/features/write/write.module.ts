import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WritePageComponent } from './pages/write-page/write-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagFactoryComponent } from './components/tag-factory/tag-factory.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { CoverImageComponent } from './components/cover-image/cover-image.component';
import { HeadingsComponent } from './components/headings/headings.component';


@NgModule({
  declarations: [
    WritePageComponent,
    TagFactoryComponent,
    ContentEditorComponent,
    CoverImageComponent,
    HeadingsComponent
  ],
  imports: [
    CommonModule,
    WriteRoutingModule,
    SharedModule
  ]
})
export class WriteModule { }
