import { Injectable } from '@angular/core';

declare var dataLayer: any[];

interface Metrics {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() {}

  setVirtualPageView(pageName: string): void {
    dataLayer.push({
      event: 'virtualPageView',
      pageName: pageName ? pageName : ''
    });
    console.log('virtualPageView', dataLayer[dataLayer.length - 1]);
  }

  setVirtualEvent(category: string, action: string, label: string, metrics?: Metrics): void {
    dataLayer.push({
      event: 'virtualEvent',
      category,
      action,
      label,
      ...metrics
    });
    console.log('virtualEvent', dataLayer[dataLayer.length - 1]);
  }

  setSessionUserEvent(userId: string): void {
    dataLayer.push({
      event: 'sessionUserEvent',
      userId
    });
    console.log('sessionUserEvent', dataLayer[dataLayer.length - 1]);
  }
}
