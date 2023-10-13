import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostPageComponent } from './pages/post-page/post-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    PostPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReadRoutingModule
  ],
})
export class ReadModule { }
