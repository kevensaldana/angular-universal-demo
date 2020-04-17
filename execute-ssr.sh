#!/bin/sh
ng build --prod && ng run demo-angular-universal:server:production

docker build --network=host -f SSR.Dockerfile -t angular-universal .

docker run --rm -p 4000:4000  -e AM_TS='keven' \
                          -e AM_KEY='f9fa874a9bee4b1082b61f1a20eb5424' \
                          -e AM_HASH='7a449c39af2b9552d4535b5f7e855174' angular-universal
