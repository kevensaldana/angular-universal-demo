import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/messaging';
import { isPlatformBrowser } from '@angular/common';
import {FirebaseMessaging} from '@firebase/messaging-types';
@Injectable({
  providedIn: 'root',
})
export class HandlerFirebase {
  messaging: FirebaseMessaging;
  tokenPush: string;
  constructor(@Inject(PLATFORM_ID) private readonly platformId) {

  }
  init() {
    if (!firebase.apps.length && isPlatformBrowser(this.platformId)) {
      firebase.initializeApp({
        apiKey: 'AIzaSyB8-SHHBfq63wTGYwdpYZGjhzulza6hdR8',
        projectId: 'angular-keven-template',
        messagingSenderId: '910361033064',
        appId: '1:910361033064:web:e3b0499142858d3d5a7edd'
      });
    }
  }

  private async updateToken() {
    if (this.messaging) {
      this.tokenPush = await this.messaging.getToken();
    }
  }

  async vapidFCM(swRegistration: ServiceWorkerRegistration) {
    try {
      if (isPlatformBrowser(this.platformId)) {
        this.messaging = firebase.messaging();
        this.messaging.useServiceWorker(swRegistration);
        this.messaging.usePublicVapidKey('BLpqpNAoSWW9syR6si12cywk2ccAqmSSvjOHf7MUmF35i-ki2oSnlFuQR-BTZoFo3bFUwaMgPhDr8mxbiw41RV0');
        this.updateToken();
        this.messaging.onTokenRefresh(() => {
          this.updateToken();
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  }

}
