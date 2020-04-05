#!/bin/sh
rm -v /etc/nginx/conf.d/nginx_tmp.conf
exec nginx -g 'daemon off;'
