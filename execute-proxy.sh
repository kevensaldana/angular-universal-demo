#!/bin/sh
docker build --network=host -f Dockerfile -t angular-proxy .

docker run --rm -p 3500:80  angular-proxy
