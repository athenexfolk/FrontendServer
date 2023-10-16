import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { Runner } from './sockets/runner';
import { PublicEndpointSwitcherInterceptor } from './core/interceptor/public-endpoint-switcher.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    AppLayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PublicEndpointSwitcherInterceptor,
      multi: true
    },
    {
      provide: Runner,
      useValue: Runner.getInstance()
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
