import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WritePageComponent } from './pages/write-page/write-page.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    WritePageComponent
  ],
    imports: [
        CommonModule,
        WriteRoutingModule,
        SharedModule
    ]
})
export class WriteModule { }
