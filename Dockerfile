# In your Dockerfile.
FROM node:7.8.0
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

#RUN mkdir -p /frontend
#WORKDIR /frontend
COPY . .

RUN npm install

CMD npm install -g http-server && npm run build && cd build && 	hs -p 3000;


EXPOSE 3000