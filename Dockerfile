FROM nginx

RUN apt-get update
RUN apt-get install -y nginx-extras curl htop

ADD ./devops/docker/nginx.webapp.conf /etc/nginx/conf.d/default.conf
ADD ./devops/docker/nginx.root.conf /etc/nginx/nginx.conf
ADD ./devops/docker/webapp_startup.sh /usr/bin/webapp_startup.sh

RUN chmod +x /usr/bin/webapp_startup.sh

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
