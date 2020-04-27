import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { filter, first, map, startWith, tap } from 'rxjs/operators';

import { Workbox } from 'workbox-window';
import {environment} from '../../../../environments/environment';

declare const window: any;
declare const navigator: any;

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class FacadePwaService {

  applicationOnline$: Observable<boolean> = merge(
    fromEvent(window, 'offline'),
    fromEvent(window, 'online'),
  ).pipe(
    map(() => navigator.onLine),
    startWith(true),
  );

  newVersionAvailable$: Observable<boolean>;
  applicationInstallable$: Observable<boolean>;
  runningStandAlone = false;

  private newVersionAvailable = new BehaviorSubject(false);
  private applicationUpdateRequested = new BehaviorSubject(false);
  private serviceWorkerReady = new BehaviorSubject(false);
  private applicationInstallable = new BehaviorSubject(false);

  private sw = {
    file: '/sw.js',
    registerOptions: {},
    updateInterval: 60 * 1000, // every 1m
  };

  private promptEvent: BeforeInstallPromptEvent;
  private swRegistration: ServiceWorkerRegistration;

  private serviceWorkerAvailable = false;
  private visible = true;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {

  }

  initTasks() {
    this.newVersionAvailable$ = this.newVersionAvailable.asObservable();
    this.applicationInstallable$ = this.applicationInstallable.asObservable();
    this.checkInstallPrompt();
    this.registerServiceWorker().then(() => {});
    this.checkRunningStandAlone();
    this.registerVisibleChangeListener();
  }

  update(): void {
    this.applicationUpdateRequested.next(true);
  }

  async checkForUpdate(): Promise<any> {
    if (this.serviceWorkerAvailable) {
      try {
        console.log('updating sw');
        return await this.swRegistration.update();
      } catch (err) {
        console.log('sw.js could not be updated', err);
      }
    } else {
      console.log('sw functionality currently not available');
    }
  }

  promptInstall(): Promise<void> {
    if (!this.promptEvent) {
      return;
    }
    return this.promptEvent.prompt().then(() => this.applicationInstallable.next(false));
  }

  private async registerServiceWorker(): Promise<any> {
    // only do this in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.serviceWorkerAvailable = 'serviceWorker' in navigator && environment.production;
    }

    // Check that service workers are available
    // Only register service worker when in production
    if (!this.serviceWorkerAvailable) {
      this.serviceWorkerReady.next(true);
      return;
    }

    const wb = new Workbox(this.sw.file, this.sw.registerOptions);

    wb.addEventListener('activated', async event => {
      if (!event.isUpdate) {
        // If your service worker is configured to precache assets, those
        // assets should all be available now.

        // Send a message telling the service worker to claim the clients
        // This is the first install, so the functionality of the app
        // should meet the functionality of the service worker!
        wb.messageSW({ type: 'CLIENTS_CLAIM' });

        // The service worker is ready, so we can bootstrap the app
        this.serviceWorkerReady.next(true);
      }
    });

    wb.addEventListener('controlling', async () => {
      this.serviceWorkerReady.next(true);
    });

    // we use this waiting listener to show updates
    // when the user refreshes the page and a new service worker is going to waiting
    // this is specificaly only valid when refreshed!
    wb.addEventListener('waiting', async () => {
      // inform any functionality that is interested in this update
      this.newVersionAvailable.next(true);

      // listen to application update requests
      this.applicationUpdateRequested.pipe(
        filter((applicationUpdateRequested) => applicationUpdateRequested),
        first(),
      ).subscribe(_ => {
        wb.addEventListener('controlling', () => {
          // new service worker became active, lets reload!
          window.location.reload();
        });

        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        // Note: for this to work, you have to add a message
        // listener in your service worker. See below.
        wb.messageSW({ type: 'SKIP_WAITING' });

      });
    });

    // we use this waiting listener to handle the update we do
    // based on an interval, user intent or visibility change
    // in this case another service worker became waiting
    wb.addEventListener('externalwaiting', event => {
      // inform any functionality that is interested in this update
      this.newVersionAvailable.next(true);

      // listen to application update requests
      this.applicationUpdateRequested.pipe(
        filter((applicationUpdateRequested) => applicationUpdateRequested),
        first(),
      ).subscribe(_ => {
        // Send a message telling the service worker to skip waiting and
        // become active. We use event.sw.postMessage, and not wb.messageSw,
        // because we want to message the waiting SW and not the currently
        // active service worker
        event.sw.postMessage({ type: 'SKIP_WAITING' });

      });
    });

    // the other service worker became actived!
    wb.addEventListener('externalactivated', () => {
      // If your service worker is configured to precache assets, those
      // assets should all be available now.
      // This activation was on request of the user, so let's finally reload the page
      window.location.reload();
    });

    try {
      this.swRegistration = await wb.register();
      setInterval(async () => {
        this.checkForUpdate();
      }, this.sw.updateInterval);

      if (navigator.serviceWorker.controller) {
        this.serviceWorkerReady.next(true);
      }
    } catch (e) {
      console.log('error registering service worker', e);
    }
  }

  private checkRunningStandAlone(): void {
    // only do this in the browser
    if (isPlatformBrowser(this.platformId) && 'matchMedia' in window) {
      if ((navigator as any).standalone) {
        console.log('Launched: Installed (iOS)');
        this.runningStandAlone = true;
      } else if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Launched: Installed');
        this.runningStandAlone = true;
      } else {
        console.log('Launched: Browser Tab');
      }
    }
  }

  private registerVisibleChangeListener(): void {
    // only do this in the browser
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(document, 'visibilitychange').pipe().subscribe(async () => {
        this.visible = document.visibilityState === 'visible';
        // only check for update if the page became visible
        if (this.visible) {
          this.checkForUpdate();
        }
      });
    }
  }

  private checkInstallPrompt(): void {
    fromEvent(window, 'beforeinstallprompt')
      .pipe(
        tap((event: BeforeInstallPromptEvent) => {
          this.promptEvent = event;
          this.applicationInstallable.next(true);
          event.preventDefault();
        }),
      ).subscribe();
  }
}
