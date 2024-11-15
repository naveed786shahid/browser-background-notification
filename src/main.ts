import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./assets/firebase-messaging-sw.js').then(
      (registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      },
      (err) => {
        console.error('Service Worker registration failed:', err);
      }
    );
  }
  
