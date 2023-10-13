import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './components/account/account.component';
import { BrandComponent } from './components/brand/brand.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@NgModule({
  declarations: [
    HeadBarComponent,
    BottomBarComponent,
    AccountComponent,
    BrandComponent,
    NavigationBarComponent,
    NavigationItemComponent,
    SearchBarComponent,
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
