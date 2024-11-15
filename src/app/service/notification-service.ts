// src/app/service/notification-service.ts
import { Injectable,Inject } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Messaging, onMessage ,getToken} from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messaging: Messaging) {}
  private token :any = new BehaviorSubject<string>('');
  public myString$ = this.token.asObservable();
  updateString(newValue: any): void {
    this.token.next(newValue); // Update the value
  }
  requestPermission() {
    if (typeof window !== 'undefined' && 'Notification' in window) 
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          this.getDeviceToken();  // Call getDeviceToken after permission is granted

        } else {
          console.warn('Notification permission denied.');
        }
      })
      .catch((err) => console.error('Error requesting notification permission:', err));
  }

  listen() {

    onMessage(this.messaging, (payload:any) => {
      console.log('Message received. ', payload);

      // Optionally display the notification using the Notification API
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
  }
  requestPermission1(): void {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log("Notification permission granted.");
            this.registerPeriodicSync();

          }
        });
      }else{
        this.registerPeriodicSync();

      }


    } else {
      console.warn('Notifications are not supported in this environment.');
    }
  }
  getDeviceToken() {
    getToken(this.messaging, {
      vapidKey: 'BLyPYSrJZFbENiQJNjx5S82yn8RnNwja4m_Zu39WWUNMCRQKW98rVSKY5mhc3HRFVCFR_-6hfcv6mzFcXANLofg',
    })
      .then((token:any) => {
        if (token) {
          console.log('Device Token:', token);
          this.updateString(token)
          // Save this token to your server for future use
        } else {
          console.warn('No device token available. User may not have granted permission.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving device token:', error);
      });
  }
  showNotification(title: string, body: string): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'https://example.com/notification-icon.png',  // Optional icon
      });
    }
  }
  async registerPeriodicSync1() {
      try {
       const registration = await this.registerServiceWorker();
       if (!registration) {
         console.error('Service worker registration is required for periodic sync.');
         return;
       }
     
      //  const registration = await navigator.serviceWorker.register('./assets/ngsw-worker.js');
        console.log('Service Worker registered:', registration);
  
        // Check if periodic sync is supported
        const serviceWorkerRegistration  :any= await navigator.serviceWorker.ready;
        
        if ('periodicSync' in serviceWorkerRegistration) {
          // Register periodic sync
          await serviceWorkerRegistration.periodicSync.register('periodic-notification', {
            minInterval: 60 * 1000, // 1 minute interval
          });
          console.log("Periodic sync registered");
        } else {
          console.log("Periodic Sync is not supported in this browser.");
        }
        
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    
  }

  async  registerPeriodicSync() {
    const registration :any= await this.registerServiceWorker();
    if (!registration) {
      console.error('Service worker registration is required for periodic sync.');
      return;
    }
  
    if ('periodicSync' in registration) {
      try {
        await registration.periodicSync.register('periodic-notification', {
          minInterval: 60 * 1000, // Minimum interval is 1 minute
        });
        console.log('Periodic sync registered successfully');
      } catch (error) {
        console.error('Failed to register periodic sync:', error);
      }
    } else {
      console.log('Periodic Sync is not supported in this browser.');
    }
  }
  
  
  async  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./assets/ngsw-worker.js');
        console.log('Service Worker registered:', registration);
        
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    } else {
      console.warn('Service workers are not supported in this browser.');
      return null;

    }
  }
  
}
