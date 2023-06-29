import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HomePageComponent,
    PostPageComponent
  ],
    imports: [
        CommonModule,
        ReadRoutingModule,
        SharedModule
    ]
})
export class ReadModule { }
