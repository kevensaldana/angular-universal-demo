import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestPermissionNotification {
  public hasPermission$ = new BehaviorSubject<boolean>(isPlatformBrowser(this.platformId) && ('Notification' in window) && Notification.permission === 'granted');
  constructor(@Inject(PLATFORM_ID) private readonly platformId) {

  }
  request() {
    if (isPlatformBrowser(this.platformId) && ('Notification' in window)) {
      Notification.requestPermission((permission) => {
        this.hasPermission$.next(permission === 'granted');
      }).then();
    }
  }
}
