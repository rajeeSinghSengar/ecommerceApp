import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), // This sets up Angular's Router for handling navigation and routing in the app.
     provideHttpClient()//Registers Angular's HttpClient service to enable making HTTP requests to APIs
     ]
};
