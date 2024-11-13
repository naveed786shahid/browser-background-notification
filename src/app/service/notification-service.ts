// src/app/service/notification-service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  requestPermission(): void {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log("Notification permission granted.");
          }
          this.registerPeriodicSync();

        });
      }
    } else {
      console.warn('Notifications are not supported in this environment.');
    }
  }

  showNotification(title: string, body: string): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'https://example.com/notification-icon.png',  // Optional icon
      });
    }
  }
  async registerPeriodicSync() {
    if ('serviceWorker' in navigator) {
      try {
        const registration: any = await navigator.serviceWorker.ready;
        
        if ('periodicSync' in registration) {
          await registration.periodicSync.register('periodic-notification', {
            minInterval: 60 * 1000, // Minimum allowed interval: 1 minute
          });
          console.log("Periodic sync registered");
        } else {
          console.log("Periodic Sync is not supported in this browser.");
        }
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    } else {
      console.warn('Service workers are not supported in this environment.');
    }
  }
  
  
  
}
