import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotificationService } from './service/notification-service'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'browser-background-notification';
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.requestPermission();
    this.notificationService.registerPeriodicSync();
  }
}
