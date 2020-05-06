import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

declare var dataLayer: any[];

interface Metrics {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  setVirtualPageView(pageName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      dataLayer.push({
        event: 'virtualPageView',
        pageName: pageName ? pageName : ''
      });
    }

  }

  setVirtualEvent(category: string, action: string, label: string, metrics?: Metrics): void {
    if (isPlatformBrowser(this.platformId)) {
      dataLayer.push({
        event: 'virtualEvent',
        category,
        action,
        label,
        ...metrics
      });
    }
  }

  setSessionUserEvent(userId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      dataLayer.push({
        event: 'sessionUserEvent',
        userId
      });
    }
  }
}
