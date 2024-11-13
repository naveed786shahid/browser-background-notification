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

 // src/app/service/notification-service.ts
async registerPeriodicSync() {
    // Ensure the service worker is available in this environment
    if ('serviceWorker' in navigator) {
      try {
        const registration :any = await navigator.serviceWorker.ready;
        
        if ('periodicSync' in registration) {
          // Register periodic sync
          await registration.periodicSync.register('periodic-notification', {
            minInterval: 1 * 30 * 1000, // 1 hour in milliseconds
          });
          console.log("Periodic sync registered");
        } else {
          console.log("Periodic Sync is not supported in this browser.");
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    } else {
      console.warn('Service workers are not supported in this environment.');
    }
  }
  
  
  
}