import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { TokenInterceptor } from './domains/shared/services/token-interceptor.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideRouter(routes),
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true 
    }

  ]
};
