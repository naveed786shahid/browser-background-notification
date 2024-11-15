import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
export const appConfig: ApplicationConfig = {
  providers: [ provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging()),provideRouter(routes), provideClientHydration(), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    ]
};
