import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WritePageComponent } from './pages/write-page/write-page.component';


@NgModule({
  declarations: [
    WritePageComponent
  ],
  imports: [
    CommonModule,
    WriteRoutingModule
  ]
})
export class WriteModule { }
