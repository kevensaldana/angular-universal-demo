import {Injectable} from '@angular/core';

declare var dataLayer: any[];

@Injectable({
  providedIn: 'root'
})
export class TrackingErrorJs {
  track(data: string) {
    dataLayer.push({
      event: 'errorGlobalJSEvent',
      category: 'Error Javascript',
      action : 'Error runtime',
      label: data
    });
  }
}
