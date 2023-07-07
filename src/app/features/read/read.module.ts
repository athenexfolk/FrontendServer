import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import {SharedModule} from "../../shared/shared.module";
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { PostsPanelComponent } from './components/posts-panel/posts-panel.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { TagPanelComponent } from './components/tag-panel/tag-panel.component';
import { RelatedPanelComponent } from './components/related-panel/related-panel.component';


@NgModule({
  declarations: [
    HomePageComponent,
    PostPageComponent,
    HeroBannerComponent,
    PostsPanelComponent,
    SidePanelComponent,
    TagPanelComponent,
    RelatedPanelComponent
  ],
    imports: [
        CommonModule,
        ReadRoutingModule,
        SharedModule
    ]
})
export class ReadModule { }
