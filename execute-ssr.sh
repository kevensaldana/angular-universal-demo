#!/bin/sh
ng build --prod && ng run demo-angular-universal:server:production

docker build --network=host -f SSR.Dockerfile -t angular-universal .

docker run --rm -p 4000:4000  angular-universal
