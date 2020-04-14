FROM node:lts-slim

RUN apt-get update
RUN apt-get install -y curl htop

COPY ./dist/demo-angular-universal /var/www/code

CMD ["node", "/var/www/code/server/main.js"]

EXPOSE 4000
