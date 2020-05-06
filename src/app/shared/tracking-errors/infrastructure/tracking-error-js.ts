import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

declare var dataLayer: any[];

@Injectable({
  providedIn: 'root'
})
export class TrackingErrorJs {
  constructor(@Inject(PLATFORM_ID) private platformId) {
  }

  track(data: string) {
    if (isPlatformBrowser(this.platformId)) {
      dataLayer.push({
        event: 'errorGlobalJSEvent',
        category: 'Error Javascript',
        action : 'Error runtime',
        label: data
      });
    }
  }
}
