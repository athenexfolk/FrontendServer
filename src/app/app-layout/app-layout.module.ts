import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeadBarComponent,
    BottomBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeadBarComponent,
    BottomBarComponent,
  ]
})
export class AppLayoutModule { }
