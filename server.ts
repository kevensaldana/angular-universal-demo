import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import fetch from 'node-fetch';
const bodyParser = require('body-parser');
import { join } from 'path';
require('dotenv').config();
const expressStaticGzip = require('express-static-gzip');

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';

// ssr DOM
const domino = require('domino');


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = process.env.NODE_ENV === 'production' ? '/var/www/code/browser' : 'dist/demo-angular-universal/browser';
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // index from browser build!
  const template = readFileSync(join(distFolder, 'index.html')).toString();
  // for mock global window by domino
  const win = domino.createWindow(template);
  global['window'] = win;
  global['document'] = win.document;

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.use(bodyParser.json());

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', expressStaticGzip(distFolder, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    serveStatic: {
      maxAge: '1d'
    }
  }));

  server.post('/api/web-push-test', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    const token = request.body.token;
    const notification = JSON.stringify({
      notification: {
        title: 'New Hero',
        body: 'Firebase is awesome',
        icon: 'assets/icons/icon-48x48.png'
      },
      to: token
    });
    fetch('https://fcm.googleapis.com/fcm/send', {
      headers: {'Content-Type': 'application/json', Authorization: `key=${process.env.FCM_KEY_SERVER}`},
      method: 'post',
      body: notification
    }
      )
    // tslint:disable-next-line:no-shadowed-variable
      .then((response) => response.json())
      .then((data) => {
        return response.send(JSON.stringify(data));
      })
    ;
  });


  // Example Express Rest API endpoints
  server.get('/api/list-characters', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    fetch(getUrlCharacter())
    // tslint:disable-next-line:no-shadowed-variable
      .then((response) => response.json())
      // tslint:disable-next-line:no-shadowed-variable
      .then((response) => {
        const {data} = response;
        const result = data.results.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: `${item.thumbnail.path.replace('http', 'https')}.${item.thumbnail.extension}`
        }));
        return {
          limit: data.limit,
          total: data.total,
          count: data.count,
          result
        };
      })
      .then((data) => response.send(JSON.stringify(data)));
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function getUrlCharacter() {
  return `https://gateway.marvel.com:443/v1/public/characters?ts=${process.env.AM_TS}&apikey=${process.env.AM_KEY}&hash=${process.env.AM_HASH}`;
}

function run() {
  const port = process.env.PORT || 4000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
