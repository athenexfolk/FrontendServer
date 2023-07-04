import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WritePageComponent } from './pages/write-page/write-page.component';
import {SharedModule} from "../../shared/shared.module";
import { PublishButtonComponent } from './components/publish-button/publish-button.component';
import { TagFactoryComponent } from './components/tag-factory/tag-factory.component';
import { CoverImageComponent } from './components/cover-image/cover-image.component';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';


@NgModule({
  declarations: [
    WritePageComponent,
    PublishButtonComponent,
    TagFactoryComponent,
    CoverImageComponent,
    ContentEditorComponent
  ],
    imports: [
        CommonModule,
        WriteRoutingModule,
        SharedModule
    ]
})
export class WriteModule { }
