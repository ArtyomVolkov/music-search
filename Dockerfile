FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    nginx

COPY /nginx/nginx.conf /etc/nginx/conf.d/
#
COPY /nginx/nginx.conf /etc/nginx/nginx.conf
COPY build/. /var/www/html/.
#
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 1111
