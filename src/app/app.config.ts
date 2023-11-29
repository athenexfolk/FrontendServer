import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { publicEndpointInterceptor } from './core/interceptors/public-endpoint.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(
      withInterceptors([publicEndpointInterceptor, tokenInterceptor])
    ),
  ],
};
