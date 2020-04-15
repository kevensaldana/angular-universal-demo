#!/bin/sh
ng build --prod && ng run demo-angular-universal:server:production

docker build --network=host -f SSR.Dockerfile -t angular-universal .

docker run --rm -p 4000:4000  -e AM_TS='AM_TS' \
                          -e AM_KEY='AM_KEY' \
                          -e AM_HASH='AM_HASH' angular-universal
