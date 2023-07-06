import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MobileMenuButtonComponent } from './components/mobile-menu/mobile-menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BrandComponent,
    SearchBarComponent,
    MobileMenuButtonComponent,
    NavigationComponent,
    LoginButtonComponent,
    AvatarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
