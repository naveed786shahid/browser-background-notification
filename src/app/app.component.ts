import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotificationService } from './service/notification-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'browser-background-notification';
  constructor(private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone
  ) {}


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.run(() => {
        // This will run only in the browser and ensures it's within the Angular zone
        console.log(navigator.userAgent,'SGENEEEE');
        this.notificationService.requestPermission();
        this.notificationService.registerPeriodicSync();
      });
    }
  }
}
