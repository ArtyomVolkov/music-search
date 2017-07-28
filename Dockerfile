FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    npm \
    nodejs \
    nginx

COPY . /frontend
WORKDIR /frontend
RUN npm install && npm run build-prod

#COPY default.conf /etc/nginx/conf.d/
#
#COPY /nginx/nginx.conf /etc/nginx/nginx.conf
#COPY /build/. /etc/nginx/html/.
#
#CMD ["nginx", "-g", "daemon off;"]
#EXPOSE 1111
