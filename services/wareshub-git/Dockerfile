FROM node:6


RUN \
  apt-get update && \
  apt-get install -y git python libldap2-dev && \
  apt-get autoremove -y



RUN mkdir -p /app
RUN mkdir -p /data

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /app

RUN npm install -g nodemon

WORKDIR /app

ENV NODE_PATH=./lib:/data/conf:$NODE_PATH

CMD node services/api/main.js
