import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()/* withFetch() */),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: tokenInterceptor,
    multi: true
  }]
};
