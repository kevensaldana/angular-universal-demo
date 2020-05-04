import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CheckRunningStandAlone {
  constructor(@Inject(PLATFORM_ID) private readonly platformId) {

  }
  check() {
    // only do this in the browser
    if (isPlatformBrowser(this.platformId) && 'matchMedia' in window) {
      if ((navigator as any).standalone) {
        console.log('Launched: Installed (iOS)');
        return true;
      } else if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Launched: Installed');
        return true;
      } else {
        console.log('Launched: Browser Tab');
      }
    }
    return false;
  }
}
