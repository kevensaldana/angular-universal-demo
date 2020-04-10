FROM node:lts-slim

RUN apt-get update
RUN apt-get install -y curl htop

COPY ./dist/demo-angular-universal /var/www/code

ADD ./devops/docker/webapp_startup.sh /usr/bin/webapp_startup.sh

RUN chmod +x /usr/bin/webapp_startup.sh

CMD ["node", "/var/www/code/server/main.js"]

EXPOSE 4000
