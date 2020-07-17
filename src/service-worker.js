import {NavigationRoute, registerRoute} from "workbox-routing";
import { StaleWhileRevalidate} from "workbox-strategies";
import {ExpirationPlugin} from "workbox-expiration";
import {cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute} from "workbox-precaching";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {setCacheNameDetails} from "workbox-core";

cleanupOutdatedCaches();

setCacheNameDetails({
  prefix: "angular",
  suffix: "pwa",
  precache: "precache",
  runtime: "run-time",
  googleAnalytics: "ga",
});

precacheAndRoute(self.__WB_MANIFEST);

const defaultRouteHandler = createHandlerBoundToURL("/index.html");
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler);
registerRoute(defaultNavigationRoute);

// Google Fonts cache setup
// see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  }),
);


registerRoute(
  /^http:\/\/i\.annihil\.us/,
  new StaleWhileRevalidate({
    cacheName: "image-marvel",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data && event.data.type === "CLIENTS_CLAIM") {
    self.clients.claim();
  }
});

self.addEventListener('notificationclose', function(e) {
  console.log('Closed notification: ' ,  e);
});

self.addEventListener("notificationclick", function(event) {
  console.log("SW: Clicked notification", event);
});

self.addEventListener("push", event => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }
  let notification;
  if (event.data) {
    notification = event.data.json().notification;
  }
  const options = {
    body: notification.body,
    icon: notification.icon,
    vibrate: [100, 50, 100]
  };
  event.waitUntil(
    self.registration.showNotification(notification.title, options)
  );

});
